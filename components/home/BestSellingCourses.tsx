'use client';
// ------------ Utils ----------------
import CoursesApi from "@/app/_utils/CoursesApi";
// ------------ Components ----------------
import CourseCard from "./CourseCard";
import { Error, Loading, NoContent } from "../ui";
// ------------ Swiper ----------------
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
// ------------ Hooks ----------------
import { useFetch } from "@/hooks";
// ------------ Types ----------------
import { TCourse } from "@/types";

const BestSellingCourses = () => {
  const {
    data: bestSellingCourses,
    loading,
    error,
  } = useFetch(() => CoursesApi.getBestSellingCourses()) as { data: TCourse[], loading: boolean, error: Error | null};

  return (
    <section className="relative px-6 sm:px-16 lg:px-40 pb-9 bg-background-color dark:bg-background-dark-color">
      {/* Section Title */}
      <h1 className="text-3xl self-start font-bold text-primary mb-16">
        Top Courses
      </h1>

      {error ? 
        <Error error={error} />
       : loading ? 
        <Loading height="1/2" />
       : bestSellingCourses && bestSellingCourses?.length> 0 ? 
        <Swiper
          slidesPerView={1}
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          scrollbar={{ draggable: true }}
          className="px-64 cursor-grab !py-6"
        >
          {bestSellingCourses?.map((course) => (
            <SwiperSlide key={course.id}>
              <CourseCard course={course} />
            </SwiperSlide>
          ))}

          {/* Custom navigation buttons */}
          <div className="swiper-button-prev !text-light-color !hover:text-primary" />
          <div className="swiper-button-next !text-light-color !hover:text-primary" />
          <div className="swiper-pagination flex mt-9 !pl-3 gap-2" />
        </Swiper>
       : 
        // Display empty page if no courses are found
        <NoContent />
      }
    </section>
  );
};

export default BestSellingCourses;
