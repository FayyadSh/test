// ------------ Components ----------------
import { OrderCourse } from './index'
// ------------ Types ----------------
import { TOrder } from '@/types';

const Order = ({ totalPrice, date, courses }: TOrder) => {
    return (
        <div className="mb-5 w-full bg-background-secondary-color dark:bg-background-dark-color rounded-md">
            {/* Header displaying the date of the order */}
            <h2 className='text-primary p-3 border-light-color/25 border-b-2'>
                {date}
            </h2>

            {/* Mapping through the courses and rendering OrderCourse for each */}
            {courses?.map(course => 
                <OrderCourse key={course?.id} course={course} /> // Using course ID as key
            )}
            
            {/* Footer displaying the total amount of the order */}
            <h2 className="p-3 text-white text-center bg-cyan-500 dark:bg-[#0d0d10] rounded-b-md">
                Total: {totalPrice} $
            </h2>
        </div>
    );
}

export default Order;
