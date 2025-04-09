// ------------ Components ----------------
import { CourseDetails, SimilarCourses } from "@/components/course-details";
import { Loading, Breadcrumb } from "@/components/ui";
import { Suspense } from 'react';
// ------------ Utils ----------------
import CoursesApi from "@/app/_utils/CoursesApi";
// ------------ Types ----------------
import { Metadata } from 'next';
import { TCourse } from "@/types";

/**
 * Interface defining the expected route parameters
 * @property courseTitle - The title/slug of the course from the URL
 */
interface CourseParams {
  courseTitle: string;
}

/**
 * Generates dynamic metadata for the course details page
 * @param params - Object containing course title parameter
 * @returns Metadata object with the course title as page title
 */
export const generateMetadata = async ({params} : {params: Promise<CourseParams>}) : Promise<Metadata> => {
  const id = (await params).courseTitle;
  return {
    title: `${decodeURIComponent(id)}`
  }
}

/**
 * Course Details Page Component
 * Displays detailed information about a specific course and similar courses
 * @param params - Object containing course parameters (title/slug)
 * @returns React component with course details layout
 */
const Page = async ({ params }: { params: Promise<CourseParams> }) => {
  // Extract course title from route parameters
  const courseTitle = (await params).courseTitle;
  
  // Format search query for API call
  const searchQuery = `query=${decodeURIComponent(courseTitle).toLowerCase()}`;

  // Fetch course data based on the title/slug
  const response = await CoursesApi.getSearchResultCourses(searchQuery);
  const course: TCourse = response.data[0];

  return (
    <section className="relative pt-32 px-6 sm:px-16 lg:px-40 bg-background-color dark:bg-background-dark-color">
      {/* Breadcrumb navigation showing current course path */}
      <Breadcrumb path={`/courses/${courseTitle}`} />

      <div>
        {/* Main course details component */}
        <CourseDetails course={course} />
        
        {/* Similar courses section header */}
        <h2 className="mt-24 text-xl text-light-color mb-8">
          Similar Courses
        </h2>

        {/* Suspense wrapper for lazy loading similar courses with loading fallback */}
        <Suspense fallback={<Loading height="1/2" />}>
          <SimilarCourses 
            courseCategory={course?.category} 
            courseTitle={course?.title}
          />
        </Suspense>
      </div>
    </section>
  );
};

export default Page;