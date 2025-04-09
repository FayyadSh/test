// ------------ Components ----------------
import CartItemsList from "./CartItemsList";
import Link from "next/link";
// ------------ Types ----------------
import { TCoursesList } from "@/types";

type TNavCart = TCoursesList & {
  closeCart: () => void;
}

const Cart = ({ courses: cartItems, loading, error, closeCart }: TNavCart) => {
  return (
    <div className="h-[300px] w-[250px] rounded-md bg-background-secondary-color dark:bg-background-dark-secondary-color border-2 border-light-color/10 shadow-sm absolute mx-10 right-10 top-16 p-5 overflow-auto z-50">
      {/* Display the list of cart items */}
      <CartItemsList 
        courses={cartItems} 
        loading={loading || false} 
        error={error || null} 
      />

      <div className="space-y-4 text-center mt-5">
        {/* Link to the cart page */}
        <Link
          href="/cart"
          onClick={closeCart}
          className="rounded block bg-primary px-5 py-3 text-sm hover:bg-primary/80 text-gray-100 transition"
        >
          View my cart {cartItems?.length}{" "}
          {/* Display the number of items in the cart */}
        </Link>

        {/* Button to close the cart and continue shopping */}
        <button
          onClick={closeCart}
          className="inline-block text-sm text-light-color underline underline-offset-4 transition hover:text-dark-color"
        >
          Continue shopping
        </button>
      </div>
    </div>
  );
};

export default Cart;
