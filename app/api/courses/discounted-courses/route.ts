import { collection, getDoc, getDocs } from "firebase/firestore"
import { NextResponse } from "next/server";
import { db } from "../../../../lib/firebase";

export const dynamic = 'force-static';
export const revalidate = 10800;

export const GET = async () => {

    try {
        const discountedCoursesRef = collection(db, 'Discounted Courses');
        const discountedCoursesSnapshot = await getDocs(discountedCoursesRef);

        const courseReferences = discountedCoursesSnapshot?.docs[0]?.data()?.courses;
    
        const newCourses = await Promise.all(
            courseReferences.map(async (courseRef: any) => {
                const courseDoc: any = await getDoc(courseRef);
                return { id: courseDoc.id, ...courseDoc.data() }; // Combine id and data for each course document
            })
        );

        return NextResponse.json(newCourses, { status: 200 });
    } catch (err) {
        console.error("Error fetching discounted courses:", err);
        return NextResponse.json({ error: "Failed to fetch discounted courses" }, { status: 500 });
    }

}