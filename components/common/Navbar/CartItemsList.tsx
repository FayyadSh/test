// ------------ Types ----------------
import { TCourse } from '@/types';
// ------------ Icons ----------------
import { Frown, Inbox, LoaderCircle } from "lucide-react";
// ------------ Components ----------------
import SmallCartItem from './SmallCartItem';

type TCartItemsList = {
  courses: TCourse[];
  error: Error | null;
  loading: boolean;
};

const CartItemsList = ({ courses: cartItems, error, loading }: TCartItemsList) => {
  return (
    // Check if there are cart items to display
    cartItems && cartItems?.length > 0 ? 
      <ul className="mt-4 space-y-10">
        {/* Map through cart items and render each using SmallCartItem component */}
        {cartItems?.map(item => <SmallCartItem key={item.id} cartItem={item} />)}
      </ul>

    // If there's an error, display error message
    : error ? 
      <span className="flex flex-col items-center justify-center text-light-color text-lg py-12">
        <Frown className='h-7 w-7 mb-1' /> {/* Error icon */}
        {error?.message} {/* Display error message */}
      </span>

    // If loading, show loading spinner
    : loading ? 
      <span className="flex flex-col items-center justify-center text-light-color text-lg py-12">
        <LoaderCircle className="animate-spin duration-500 h-7 w-7 mb-1" /> {/* Loading spinner icon */}
        Loading ...
      </span>

    // If no cart items and no error, show empty cart message
    : 
      <span className="flex flex-col items-center justify-center text-light-color text-lg py-12">
        <Inbox className='h-7 w-7 mb-1' /> {/* Empty cart icon */}
        Your Cart is Empty {/* Empty cart message */}
      </span>
  );
}

export default CartItemsList;