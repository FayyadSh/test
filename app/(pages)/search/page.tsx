// ------------ Components ----------------
import { CoursesList } from "../../../components/common";
// ------------ Utils ----------------
import CoursesApi from "../../_utils/CoursesApi";
// ------------ Types ----------------
import { TCourse } from "../../../types";
// ------------ Metadata ----------------
import { Metadata } from "next";

/**
 * Type definition for the component's search parameters
 * @property searchParams - Promise containing optional query and category strings
 */
type TParams = { 
  searchParams: Promise<{query?: string, category?: string}> 
}

/**
 * Type definition for the API response
 * @property data - Array of course objects
 */
type TResponse = { 
  data: TCourse[];
}

/**
 * Generates dynamic metadata for the search page based on search parameters
 * @param searchParams - Object containing query and category parameters
 * @returns Metadata object with a dynamic title
 */
export const generateMetadata = async ({searchParams} : TParams) : Promise<Metadata> => {
    // Extract search query and category from URL parameters
    const title = (await searchParams).query;
    const category = (await searchParams).category;
    
    // Use query if available, otherwise fall back to category
    const query = title ? title : category as string;

    return {
      title: `search | ${decodeURIComponent(query)}`
    }
}

/**
 * Search page component that displays courses based on search parameters
 * @param searchParams - Object containing query and category parameters
 * @returns React component with filtered courses list
 */
const Page = async ({searchParams} : TParams) => {
    // Extract search parameters from URL
    const title = (await searchParams).query;
    const category = (await searchParams).category;
    
    // Format query string for API call
    const query = title ? `query=${title}` : `category=${category}`;
    
    // Normalize query string (note: this line currently doesn't affect the query as it's not assigned)
    query.toLowerCase().replace('%20', ' ')?.replace('-', ' ');

    // Fetch courses based on search query
    const searchResultCourses: TResponse = await CoursesApi.getSearchResultCourses(query) || [];

    // Render the courses list component with search results
    return <CoursesList courses={searchResultCourses?.data} />;
}

export default Page;