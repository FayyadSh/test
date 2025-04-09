import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NextResponse } from "next/server";

export const dynamic = 'force-static';
export const revalidate = 10800;

export const GET = async () => {

    try {
        const topCoursesRef = collection(db, "Top Courses");
        const topCoursesSnapshot = await getDocs(topCoursesRef);
    
        const courseReferences = topCoursesSnapshot?.docs[0]?.data()?.courses;
    
        const topCourses = await Promise.all(
            courseReferences.map(async (courseRef: any) => {
                const courseDoc: any = await getDoc(courseRef);
                return { id: courseDoc.id, ...courseDoc.data() }; // Combine id and data for each course document
            })
        );

        return NextResponse.json(topCourses, { status: 200 });

    } catch (err) {
        console.error("Error fetching top courses:", err);
        return NextResponse.json({ error: "Failed to fetch top courses" }, { status: 500 });
    }

}