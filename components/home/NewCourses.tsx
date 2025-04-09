'use client'
// ------------ Components ----------------
import { CoursesList } from "../common";
// ------------ Utils ----------------
import CoursesApi from "@/app/_utils/CoursesApi";
// ------------ Hooks ----------------
import { useFetch } from "@/hooks";
// ------------ Types ----------------
import { TCourse } from "@/types";

const NewCourses: React.FC = () => {
    const { data: newCourses, loading, error } = useFetch(() => CoursesApi.getNewCourses());
    return (
        <section className="px-6 sm:px-16 lg:px-40 pb-16 py-12 bg-background-color dark:bg-background-dark-color relative min-h-[400px]">

            {/* Render the section title only if there are courses available */}
            <h1 className="text-3xl font-bold text-primary">
                New Courses
            </h1>
            
            {/* CoursesList component to display the filtered new courses */}
            <CoursesList 
                courses={newCourses as TCourse[]} 
                loading={loading}
                error={error}
            /> 
        </section>
    );
};

export default NewCourses;
