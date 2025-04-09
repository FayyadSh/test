// ------------ Components ----------------
import Link from 'next/link';
import Image from 'next/image';
// ------------ Icons ----------------
import { Pointer } from 'lucide-react';
// ------------ Types ----------------
import { TCourse } from '@/types';

const CourseCard: React.FC<{ course: TCourse }> = ({ course }) => {
  return (
    <Link
      href={`/course/${course.title}`}
      className="bg-background-secondary-color dark:bg-background-dark-secondary-color group w-full md:w-4/5 xl:w-1/2 flex flex-col md:flex-row rounded-xl shadow-sm"
    >
      {/* Course image */}
      <Image
        src={course.banner}
        width={300}
        height={300}
        alt={course.title}
        className="rounded-lg md:rounded-none md:rounded-l-lg w-full md:w-2/3 h-[190px] md:h-[250px]"
      />

      {/* Course details */}
      <div className="p-4 grid grid-cols-1 w-full md:w-1/3">
        <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-500">
          <h1 className="text-lg md:text-3xl text-light-color font-semibold mb-2">
            {course.title}
          </h1>
          <h2 className="text-lg text-dark-color">{course.category}</h2>
          <h2 className="text-md text-dark-color mb-4">{course.price} $</h2>
          <p className="text-sm text-dark-color/40 line-clamp-3">{course.description}</p>
        </div>

        {/* Hover effect */}
        <div className="flex flex-col items-center absolute top-64 md:top-24 ml-28 md:ml-16 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Pointer className="w-8 h-8" />
          <h5>See More</h5>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
