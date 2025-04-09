import { db, auth } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";
import * as admin from 'firebase-admin';

interface CartItem {
    id: string;
    courses?: { id: string }[];
}

export const GET = async (req: Request): Promise<Response> => {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
        return NextResponse.json({ error: "Authorization token missing" }, { status: 401 });
    }

    try {
        const decodedToken = await auth.verifyIdToken(token);
        const userId = decodedToken.uid;

        const cartRef = db.collection('Carts');
        const cartQuery = cartRef.where('userId', '==', userId);
        const cartSnapshot = await cartQuery.get();

        if (cartSnapshot.empty) {
            return NextResponse.json({ cart: [] }, { status: 200 }); // Return empty cart array
        }

        const userCart: CartItem[] = cartSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const courseIds = userCart[0]?.courses?.map(course => course?.id) || [];

        if (courseIds.length === 0) {
            return NextResponse.json({ cart: [] }, { status: 200 });
        }

        const courseRef = db.collection('Courses');
        const coursePromises = courseIds.map(courseId => courseRef.doc(courseId).get());
        const courseSnapshots = await Promise.all(coursePromises);

        const coursesWithDetails = courseSnapshots.map(snapshot => {
            if (snapshot.exists) {
                const courseData = snapshot.data();
                return { id: snapshot.id, ...courseData };
            }
            return null;
        }).filter(course => course !== null);

        return NextResponse.json({ cart: coursesWithDetails }, { status: 200 });

    } catch (err: any) {
        console.error("Error fetching user cart:", err);
        if (err.code === "auth/argument-error" || err.code === "auth/id-token-expired" || err.code === "auth/invalid-id-token") {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
        }
        return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
    }
};


export const PATCH = async (req: Request): Promise<Response> => {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
        return NextResponse.json({ error: "Authorization token missing" }, { status: 401 });
    }

    try {
        const decodedToken = await auth.verifyIdToken(token);
        const userId = decodedToken.uid;

        const body = await req.json();
        const { action, courseId } = body;

        if (!action) {
            return NextResponse.json({ error: "Action is required" }, { status: 400 });
        }

        if (!["add", "remove", "clear"].includes(action)) {
            return NextResponse.json({ error: "Invalid action. Use 'add', 'remove', or 'clear'." }, { status: 400 });
        }

        const cartRef = db.collection("Carts").where("userId", "==", userId);
        const cartSnapshot = await cartRef.get();

        if (cartSnapshot.empty) {
            if (action === "remove" || action === "clear") {
                return NextResponse.json({ error: "Cart is empty. Nothing to remove/clear." }, { status: 404 });
            }

            const newCart = {
                userId,
                courses: courseId ? [{ id: courseId }] : [],
            };

            const newCartRef = await db.collection("Carts").add(newCart);
            const newCartId = newCartRef.id;

            const newCartDoc = await db.collection("Carts").doc(newCartId).get();
            const newCartData = newCartDoc.data();

            return NextResponse.json({ message: "Cart created and updated successfully", cart: [{ id: courseId, ...newCartData }] }, { status: 200 });
        }

        const cartDoc = cartSnapshot.docs[0];
        const cartId = cartDoc.id;
        const cartData = cartDoc.data();
        let updatedCourses: {id: string} [] = cartData.courses || [];
        const cartCoursesIDs = updatedCourses.map(course => course.id);

        if (action === 'clear') {
            await db.collection("Carts").doc(cartId).update({ courses: [] });
            return NextResponse.json({ message: "Cart cleared successfully", cart: [] }, { status: 200 });
        } else if (action === "add") {

            if (!courseId) {
                return NextResponse.json({ error: "courseId is required" }, { status: 400 });
            }

            if (cartCoursesIDs.includes(courseId)) {
                return NextResponse.json({ error: "Course is already in the cart" }, { status: 400 });
            }

            const courseDoc = await db.collection("Courses").doc(courseId).get();
            if (!courseDoc.exists) {
                return NextResponse.json({ error: "Course not found" }, { status: 404 });
            }

            updatedCourses.push({ id: courseId });

        } else if (action === "remove") {
            if (!courseId) {
                return NextResponse.json({ error: "courseId is required" }, { status: 400 });
            }

            if (!cartCoursesIDs.includes(courseId)) {
                return NextResponse.json({ error: "Course not found in the cart" }, { status: 404 });
            }

            updatedCourses = updatedCourses.filter(course => course.id !== courseId);
        }

        await db.collection("Carts").doc(cartId).update({ courses: updatedCourses });

        const courseRef = db.collection('Courses');
        const coursePromises = updatedCourses.map(course => courseRef.doc(course.id).get());
        const courseSnapshots = await Promise.all(coursePromises);

        const coursesWithDetails = courseSnapshots.map(snapshot => {
            if (snapshot.exists) {
                return { id: snapshot.id, ...snapshot.data() };
            }
            return null;
        }).filter(course => course !== null);

        return NextResponse.json({ message: "Cart updated successfully", cart: coursesWithDetails }, { status: 200 });

    } catch (err: any) {
        console.error("Error updating cart:", err);
        if (
            err.code === "auth/argument-error" ||
            err.code === "auth/id-token-expired" ||
            err.code === "auth/invalid-id-token"
        ) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
        }
        return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
    }
};