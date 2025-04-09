// ------------ Icons ----------------
import { Clock, User } from "lucide-react";
// ------------ Components ----------------
import Image from "next/image";
import Link from "next/link";
// ------------ Types ----------------
import { TCourse } from "@/types";

const Course = ({ course }: { course: TCourse} ) => {
  return (
    <Link
      href={`/course/${course?.title}`}
      className="cursor-pointer hover:shadow-sm rounded-lg hover:shadow-primary transition-all ease-in duration-200 group relative mb-4"
    >
      {/* course Image */}
      <Image
        src={course?.banner}
        alt="course Banner"
        width={450}
        height={300}
        className="rounded-t-lg h-[170px] object-cover group-hover:opacity-0 transition-opacity duration-300"
      />

      {/* course Information: Title and Pricing */}
      <div className="py-3 pl-3 bg-background-secondary-color dark:bg-background-dark-secondary-color rounded-b-lg">
        <h1 className="text-lg font-semibold text-primary line-clamp-1 mb-1">
          {course?.title}
        </h1>

        {/* course Category and Price */}
        <div className="flex items-center text-light-color justify-between">
          <h1 className="text-sm">
            {course?.category}
          </h1>
          
          {/* course Price with discount handling */}
          <div className="flex items-center justify-between gap-3 px-2 py-1 rounded-l bg-primary/15 dark:bg-gray-800">
            <h1 className={`text-sm text-dark-color flex gap-3 ${course?.discount && 'line-through'}`}>
              {course?.price} $
            </h1>
            {/* Show discounted price if applicable */}
            <h1 className={`text-sm text-gray-500 ${course?.discount ? 'flex' : 'hidden'} gap-3`}>
              {course?.price - course?.discount} $
            </h1>
          </div>
        </div>
      </div>

      {/* Hover Content (appears when the user hovers over the course) */}
      <div className="absolute bottom-0 inset-0 flex dark:bg-background-dark-secondary-color text-light-color flex-col justify-center items-start pl-7 gap-3 bg-background-secondary-color opacity-0 h-0 group-hover:opacity-100 group-hover:h-[100%] transition-all duration-500 p-4 rounded-lg">
        {/* Hover Details */}
        <h1 className="text-2xl font-semibold text-primary line-clamp-1">
          {course?.title}
        </h1>
        
        {/* Category */}
        <h1 className="text-lg">
          {course?.category}
        </h1>

        {/* Number of Students */}
        <h1 className="text-lg flex gap-3">
          <User /> {course?.students} 
        </h1>

        {/* Course Duration */}
        <h1 className="text-lg flex gap-3">
          <Clock /> {course?.duration} Hours
        </h1>
      </div>
    </Link>
  );
};

export default Course;