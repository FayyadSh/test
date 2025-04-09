import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NextResponse } from "next/server";


export const dynamic = 'force-static';
export const revalidate = 10800;

export const GET = async () => {

    try {
        const newCoursesRef = collection(db, "New Courses");
        const newCoursesSnapshot = await getDocs(newCoursesRef);
    
        const courseReferences = newCoursesSnapshot?.docs[0]?.data()?.courses;
    
        const newCourses = await Promise.all(
            courseReferences?.map(async (courseRef: any) => {
                const courseDoc: any = await getDoc(courseRef);
                return { id: courseDoc.id, ...courseDoc.data() }; // Combine id and data for each course document
            })
        );

        return NextResponse.json(newCourses, { status: 200 });

    } catch (err) {
        console.error("Error fetching new courses:", err);
        return NextResponse.json({ error: "Failed to fetch new courses" }, { status: 500 });
    }

}