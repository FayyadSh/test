// ------------ Components ----------------
import { NoContent, Loading, Error  } from "../ui";
import { Course } from "./index";
// ------------ Types ----------------
import { TCoursesList } from "@/types";

const CoursesList = ({ courses, loading, error }: TCoursesList) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {courses?.length > 0 ? 
        // Render the list of courses when available
        <div className="grid py-12 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-20 md:gap-5">
          {courses?.map(course => <Course key={course?.id} course={course} />)}
        </div>

        : loading ?
          <Loading height="1/2" />
        : error ?
          <Error error={error} />
        // Show an empty page if there are no courses
        : <NoContent /> 
      }
    </div>
  );
};

export default CoursesList;
