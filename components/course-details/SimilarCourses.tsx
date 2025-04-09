import CoursesApi from "@/app/_utils/CoursesApi";
import { TCourse } from "@/types";
import { CoursesList } from "../common";

type TSimilarCourses = {
    courseCategory: string;
    courseTitle: string;
}

const SimilarCourses = async ({ courseCategory, courseTitle } : TSimilarCourses) => {
    const similarCourses = await CoursesApi.getSearchResultCourses(`category=${courseCategory}`);
    const filteredSimilarCourses = similarCourses?.data.filter(
        (course: TCourse) => course.title !== courseTitle
    );

    return <CoursesList courses={filteredSimilarCourses} />;
}

export default SimilarCourses;
