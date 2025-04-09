// ------------ Icons ----------------
import { Trash2Icon } from "lucide-react";
// ------------ Components ----------------
import Image from "next/image";
// ------------ Types ----------------
import { TCartItem } from "@/types";

const CartItem = ({ course, removeFromCart }: TCartItem) => {
  return (
    <li key={course?.id} className="flex justify-between relative gap-5"> {/* Main container for cart item */}

      {/* Displaying course banner image */}
      <div className='flex flex-col md:flex-row w-full gap-4'>
        <Image
          src={course?.banner} // Dynamic image URL based on course data
          alt="cart item image"
          width={350} 
          height={300} 
          className="rounded-lg w-full md:w-1/2 object-cover" // Styling for image
        />

        <div className="flex flex-col gap-4"> {/* Container for course details */}
          <h3 className="text-md wrap md:text-2xl font-semibold text-primary">
            {course?.title}
          </h3>

          <dl className="text-light-color"> {/* Description list for course details */}
            <div className="mb-2 bg-background-secondary-color dark:bg-gray-900 rounded-3xl w-fit px-3 py-1">
              <dd className="inline">{course?.category}</dd>
            </div>

            <div>
              <dt className="inline ml-3">Price: </dt>
              <dd className="inline">{course?.price} $</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Button to remove item from the cart */}
      <button
        onClick={() => removeFromCart(course)}
        className="text-dark-color transition bottom-3 pt-5 md:pt-0 md:pb-5 flex flex-1 items-start md:items-end justify-end align-end gap-2 hover:text-red-600"
      >
        <Trash2Icon />
      </button>
    </li>
  );
};

export default CartItem;
