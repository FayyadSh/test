// ------------ Icons ----------------
import { CircleDollarSign, Clock, List } from "lucide-react";
// ------------ Components ----------------
import Image from "next/image";
// ------------ Types ----------------
import { TCourse } from "@/types";

const OrderCourse = ({ course }: { course: TCourse }) => {
    return (
        <div className="flex flex-col md:flex-row p-5 gap-5 w-full lg:w-[900px]"> {/* Flex container for layout and spacing */}
            <Image 
                src={course?.banner} // Dynamic image source
                width={300} 
                height={200} 
                className="rounded-lg w-full md:w-1/3" // Responsive image styling
                alt="course image" 
            />

            <div>
                {/* Course title with responsive text size and color adjustments */}
                <h2 className="text-xl text-primary md:text-2xl dark:text-light-color font-semibold tracking-wider mb-2">
                    {course?.title}
                </h2>
                
                {/* Course category with icon */}
                <h2 className="text-md text-light-color/90 mb-2 flex items-center gap-2">
                    <List className='h-5 w-5' /> 
                    {course?.category}
                </h2>
                
                {/* Course duration with icon */}
                <h2 className="text-md text-light-color/90 mb-2 flex items-center gap-2">
                    <Clock className='h-5 w-5' /> 
                    {course?.duration} hours
                </h2>
                
                {/* Course price with icon */}
                <h2 className="text-md text-light-color/90 mb-2 flex items-center gap-2">
                    <CircleDollarSign className='h-5 w-5' />
                    {course?.price} $
                </h2>
            </div>
        </div>
    );
}

export default OrderCourse;
