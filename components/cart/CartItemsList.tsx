// ------------ Components ----------------
import { CartItem } from "./index";
import { Error, Loading, NoContent } from "../ui";
import Link from "next/link";
// ------------ Types ----------------
import { TCartItemsList } from "@/types";

const CartItemsList = ({ 
  courses: cartCourses, 
  loading, 
  error, 
  total, 
  removeFromCart, 
}: TCartItemsList) => {
  return (
    <div className="relative px-6 sm:px-20 lg:px-40"> {/* Main container with responsive padding */}
      {/* Main cart content */}
      <div className="flex items-center justify-center">
        {cartCourses && cartCourses?.length > 0 ? ( // Check if there are courses in the cart
          <div className="mt-8"> {/* Container for cart items */}
            <ul className="space-y-4"> {/* List of cart items */}
              {cartCourses?.map(course => ( // Map over each course and render a CartItem
                <CartItem   
                  key={course?.id} 
                  removeFromCart={removeFromCart} 
                  course={course}
                />
              ))}
            </ul>

            <div className="mt-8 mb-8 flex px-8 items-center justify-between border-t border-light-color pt-8"> {/* Summary section */}
              <dl className="flex items-center gap-4 text-dark-color !text-base font-medium"> {/* Description list for total price */}
                <dt>Total :</dt>
                <dd>{total} $</dd>
              </dl>
          
              {/* Link to the checkout page with total amount as a query parameter */}
              <Link href={`/checkout`} className="block rounded bg-gray-700 px-5 py-3 text-sm text-white transition hover:bg-gray-600">
                Checkout
              </Link>
            </div>

            <h2 className="text-light-color pl-8"> {/* Note for users */}
              Note: All Items Will Be Sent Via Email
            </h2>
          </div>
        ) : error ? ( // Handle error state
          <Error error={error} /> // Render error component
        ) : loading ? ( // Handle loading state
          <Loading /> // Render skeleton loading component
        ) : (
          <NoContent text="Your Cart Is Empty" /> // Render empty page component
        )}
      </div>
    </div>
  );
};

export default CartItemsList;
