'use client'
// ------------ Icons ----------------
import { Check, ShoppingCart, Trash } from "lucide-react";
// ------------ Components ----------------
import Image from "next/image"; 
// ------------ Hooks ----------------
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrdersContext"; 
// ------------ types ----------------
import { TCourse } from "@/types";

const CourseDetails = ({ course }: { course: TCourse}) => {
  
  // Fetch orders and cart-related data and functions from context
  const { orders } = useOrders();
  const { addToCart, removeFromCart, cartCoursesIDs } = useCart();

  // Extract unique purchased course IDs from orders
  const purchasedCoursesIDs = Array.from(
    new Set(
      orders?.flatMap(order =>
        order.courses.map(courseRef => courseRef?.id)
      )
    )
  );

  // Check if the current course is purchased or in the cart
  const isCoursePurchased = purchasedCoursesIDs?.includes(course?.id);
  const isCourseInCart = cartCoursesIDs?.includes(course?.id);

  // Handler for adding the course to the cart
  const handleAddToCart = () => {
    addToCart(course);
  };

  // Handler for removing the course from the cart
  const handleRemoveFromCart = () => {
    removeFromCart(course);
  };

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 justify-between lg:items-center gap-6 sm:gap-12 z-20">
      {/* Course banner image */}
      <Image
        src={course?.banner}
        width={500}
        height={300}
        alt="course banner"
        className="rounded-lg w-full md:w-[500px] md:h-[300px] z-20"
      />

      {/* Course details section */}
      <div>
        {/* Course title */}
        <h2 className="text-2xl text-primary mb-1">
          {course?.title}
        </h2>

        {/* Course category and price */}
        <div className='flex items-center justify-between mb-5'>
          <h3 className="text-[18px] text-light-color mt-2 font-semibold">
            {course?.category}
          </h3>
          <h4 className="text-primary text-sm mt-2 px-2 py-0.5 rounded-md bg-background-secondary-color dark:bg-background-dark-secondary-color">
            {course?.price} $
          </h4>
        </div>

        {/* Course description */}
        <p className="text-light-color text-md mt-4 mb-5">
          {course?.description}
        </p>

        {/* Action buttons (Add to Cart / Remove from Cart) */}
        <div className="flex gap-5">
          {/* Add to Cart button */}
          <button
            disabled={isCoursePurchased || isCourseInCart } // Disable if purchased, in cart, or loading
            onClick={handleAddToCart}
            className="flex gap-2 disabled:bg-teal-600 disabled:cursor-default cursor-pointer items-center mt-5 p-3 bg-primary rounded-lg hover:bg-teal-500 text-white z-10"
          >
            {isCoursePurchased ? ( // Show if course is purchased
              <>
                Purchased
                <Check />
              </>
            ) : isCourseInCart ? ( // Show if course is in cart
              <>
                In Cart
                <Check />
              </>
            ) : ( // Default state (Add to Cart)
              <>
                Add To Cart
                <ShoppingCart />
              </>
            )}
          </button>

          {/* Remove from Cart button (only shown if course is in cart and not purchased) */}
          {isCourseInCart && !isCoursePurchased && (
            <button
              className='bg-red-500 rounded-lg p-3 flex gap-2 text-white hover:bg-red-600 transition-all mt-5 z-10'
              onClick={handleRemoveFromCart}
            >
              Remove From Cart
              <Trash />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;