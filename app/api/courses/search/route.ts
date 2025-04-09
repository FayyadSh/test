import { NextResponse } from "next/server";
import { collection, DocumentData, getDocs, Query, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const courseTitle = searchParams.get('query')?.replace('-', ' ').replace('%20', ' ');
        const courseCategory = searchParams.get('category')?.replace('-', ' ').replace('%20', ' ');

        if (!courseTitle && !courseCategory) {
            return NextResponse.json({ error: "Course title or category is required" }, { status: 400 });
        }

        const coursesRef = collection(db, 'Courses');

        // Initialize with a default query that will always be overridden
        let coursesQuery: Query<DocumentData> = query(coursesRef);

        if (courseTitle && courseCategory) {
            coursesQuery = query(
                coursesRef,
                where('title', '>=', courseTitle),
                where('title', '<=', courseTitle + '\uf8ff'),
                where('category', '==', courseCategory)
            );
        } else if (courseTitle) {
            coursesQuery = query(
                coursesRef,
                where('title', '>=', courseTitle),
                where('title', '<=', courseTitle + '\uf8ff')
            );
        } else if (courseCategory) {
            coursesQuery = query(
                coursesRef,
                where('category', '==', courseCategory)
            );
        }

        const searchCourses = await getDocs(coursesQuery);

        if (searchCourses.empty) {
            return NextResponse.json({ error: "No courses found with that title or category" }, { status: 404 });
        }

        const courses = searchCourses.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Record<string, any>),
        }));

        return NextResponse.json(courses, { status: 200 });
    } catch (err) {
        console.error("Error fetching search results:", err);
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch search results";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}