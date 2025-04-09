import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase-admin";
import { db } from "@/lib/firebase-admin";
import { TCourse, TOrder } from "@/types";

export const GET = async (req: Request): Promise<Response> => {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
        return NextResponse.json({ error: "Authorization token missing" }, { status: 401 });
    }

    try {
        // Verify ID token using Firebase Admin SDK
        const decodedToken = await auth.verifyIdToken(token);
        const userId = decodedToken.uid;

        // Get the user's orders
        const ordersRef = db.collection('Orders');
        const ordersQuery = ordersRef.where('userId', '==', userId);
        const ordersSnapshot = await ordersQuery.get();

        if (ordersSnapshot.empty) {
            return NextResponse.json({ orders: [] }, { status: 200 });
        }

        const userOrders: TOrder[] = ordersSnapshot.docs.map(doc => {
            const { id: existingId, ...data } = doc.data() as TOrder;
            return { id: doc.id, ...data };
        });

        // Get unique course IDs
        const courseIds = Array.from(
            new Set(
                userOrders.flatMap(order =>
                    order.courses.map(courseRef => courseRef.id)
                )
            )
        );

        // Fetch course details
        const coursesRef = db.collection('Courses');
        const coursePromises = courseIds.map(courseId => coursesRef.doc(courseId).get());
        const courseSnapshots = await Promise.all(coursePromises);

        const coursesWithDetails: TCourse[] = courseSnapshots
            .map(snapshot => {
                if (snapshot.exists) {
                    const { id: existingId, ...data } = snapshot.data() as TCourse;
                    return { id: snapshot.id, ...data };
                }
                return null;
            })
            .filter(course => course !== null);

        // Attach detailed course info to orders
        const ordersWithCourseDetails = userOrders.map(order => ({
            ...order,
            courses: order.courses.map(courseRef =>
                coursesWithDetails.find(course => course?.id === courseRef.id) || null
            ),
        }));

        return NextResponse.json({ orders: ordersWithCourseDetails }, { status: 200 });

    } catch (err: any) {
        console.error("Error fetching user orders:", err, JSON.stringify(err, null, 2));

        if (err.code === "auth/argument-error" || 
            err.code === "auth/id-token-expired" || 
            err.code === "auth/invalid-id-token") {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
        }

        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
};


export const POST = async (req: Request): Promise<Response> => {

    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
        return NextResponse.json({ error: "Authorization token missing" }, { status: 401 });
    }

    try {
        // Verify ID token using Firebase Admin SDK
        const decodedToken = await auth.verifyIdToken(token);
        const userId = decodedToken.uid;

        // Extract body data
        const { courses, username, totalPrice, date } = await req.json();
        if (!courses || !Array.isArray(courses) || courses.length === 0) {
            return NextResponse.json({ error: "Courses are required and should be an array" }, { status: 400 });
        }

        if (!username || typeof totalPrice !== "number") {
            return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
        }

        // Validate courses exist in the Courses collection
        const coursesRef = db.collection('Courses');
        const coursePromises = courses.map((courseId: string) => coursesRef.doc(courseId).get());
        const courseSnapshots = await Promise.all(coursePromises);

        const invalidCourses = courseSnapshots.filter(snapshot => !snapshot.exists).map((_, index) => courses[index]);
        if (invalidCourses.length > 0) {
            return NextResponse.json(
                { error: `Invalid course IDs: ${invalidCourses.join(", ")}` },
                { status: 400 }
            );
        }

        // Build course references for Firestore
        const courseRefs = courses.map((courseId: string) => coursesRef.doc(courseId));

        // Create new order object
        const newOrder = {
            userId,
            username,
            userEmail: decodedToken.email,
            date, // Ensure valid date format
            totalPrice,
            courses: courseRefs, // Store references to courses
        };

        // Save the new order in the Orders collection
        const orderRef = db.collection('Orders').doc();
        await orderRef.set(newOrder);

        return NextResponse.json(
            { message: "Order created successfully", orderId: orderRef.id },
            { status: 201 }
        );

    } catch (err: any) {
        console.error("Error creating order:", err, JSON.stringify(err, null, 2));

        if (err.code === "auth/argument-error" || 
            err.code === "auth/id-token-expired" || 
            err.code === "auth/invalid-id-token") {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
        }

        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
};
