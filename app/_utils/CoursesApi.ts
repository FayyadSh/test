import axiosClient from "./axiosClient"

const getNewCourses = () => axiosClient.get('courses/new-courses');
const getDiscountedCourses = () => axiosClient.get('courses/discounted-courses');
const getBestSellingCourses = () => axiosClient.get('courses/top-courses');
const getSearchResultCourses = (query: string) => axiosClient.get(`courses/search?${query}`);

export default {
    getNewCourses,
    getDiscountedCourses,
    getBestSellingCourses,
    getSearchResultCourses,
}