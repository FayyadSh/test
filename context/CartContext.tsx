'use client'; // Ensures this component is client-side only, as it relies on hooks and state.
import { createContext, ReactNode, use, useOptimistic, startTransition } from 'react';
import { useFetch } from '@/hooks'; // Custom hook to handle API calls and state.
import CartApis from '@/app/_utils/CartApis'; // Utility file containing cart-related API functions.
import { useAuth } from './AuthContext'; // Access authentication data from AuthContext.
import { useRouter } from 'next/navigation'; // Next.js router for navigation.
import { TCartAction, TCourse } from '@/types'; // Type definitions for cart actions and course data.

// Define the structure of cart data returned by the API.
interface CartData {
  cart?: TCourse[]; // Array of courses in the cart.
}

// Define the structure of the CartContext value.
interface CartContextType {
  cart?: TCourse[]; // Array of courses in the cart.
  loading: boolean; // Indicates if cart data is still loading.
  error: Error | null; // Stores any errors that occur during cart operations.
  totalPrice: number; // Total price of the courses in the cart.
  cartCoursesIDs?: string[]; // IDs of the courses in the cart.
  addToCart: (course: TCourse) => void; // Function to add a course to the cart.
  removeFromCart: (course: TCourse) => void; // Function to remove a course from the cart.
  clearCart: () => void; // Function to clear all courses from the cart.
}

// Define the props for the CartProvider component.
interface CartProviderProps {
  children: ReactNode; // ReactNode allows any valid React child (e.g., components, elements, or strings).
}

// Create the CartContext with an initial value of undefined.
const CartContext = createContext<CartContextType | undefined>(undefined);

// The CartProvider wraps child components that need access to cart data and functions.
const CartProvider: React.FC<CartProviderProps> = ({ children }) => {

  const router = useRouter(); // Next.js router for redirection.
  const { user, loading: authLoading, setCallbackUrl } = useAuth(); // Access user authentication data and loading state.

  // Fetch the user's cart using the custom `useFetch` hook.
  const { data, loading, error, reload, setLoading } = useFetch<CartData>(() =>
    CartApis.getUserCart(), [user, authLoading] // Fetch cart data when user or authLoading changes.
  );

  const [optimisticCart, setOptimisticCart ] = useOptimistic(data?.cart || []);

  // Calculate the total price of items in the cart.
  const totalPrice = optimisticCart.reduce((total, course) => total + (course.price || 0), 0) || 0;

  // Extract the IDs of all courses in the cart.
  const cartCoursesIDs = optimisticCart?.map((course) => course.id);

  // Function to add a course to the cart.
  const addToCart = (course: TCourse) => {
    if (!user) {
      setCallbackUrl(`/course/${course.title}`);
      return router.push('/auth/unauthenticated'); // Redirect to login page if the user is not authenticated.
    }
    
    setLoading(true);
    const requestData: TCartAction = {
      action: 'add', // Action type for adding a course.
      courseId: course?.id, // ID of the course to add.
    };

    try {
      startTransition(async() => {
        setOptimisticCart((prevCart) => [...prevCart, course])
        await CartApis.updateUserCart(requestData); // Call the API to update the cart.
        reload(); // Reload cart data after the update.
      })
    } catch (err) {
      console.error('Error adding to cart:', err); // Log any errors that occur.
    } finally {
      setLoading(false);
    }
  }

  // Function to remove a course from the cart.
  const removeFromCart = (course: TCourse) => {
    if (!user) {
      setCallbackUrl(`/course/${course.title}`);
      return router.push('/auth/unauthenticated'); // Redirect to login page if the user is not authenticated.
    }
    setLoading(true);
    const requestData: TCartAction = {
      action: 'remove', // Action type for removing a course.
      courseId: course.id, // ID of the course to remove.
    };

    try {
      startTransition( async () => {
        setOptimisticCart((prevCart) => prevCart?.filter(cartCourse => cartCourse.id !== course.id))
        await CartApis.updateUserCart(requestData); // Call the API to update the cart.
        reload(); // Reload cart data after the update.
      })
    } catch (err) {
      console.error('Error removing from cart:', err); // Log any errors that occur.
    } finally {
      setLoading(false);
    }
  }

  // Function to clear all items from the cart.
  const clearCart = () => {
    setLoading(true);
    const requestData: TCartAction = { action: 'clear' }; // Action type for clearing the cart.

    try {
      startTransition(async () => {
        setOptimisticCart([]);
        await CartApis.updateUserCart(requestData); // Call the API to clear the cart.
        reload(); // Reload cart data after the update.
      })
    } catch (err) {
      console.error('Error clearing cart:', err); // Log any errors that occur.
    } finally{
      setLoading(false);
    }
  }

  // Define the value provided by the CartContext.
  const value = {
    cart: optimisticCart, // Array of courses in the cart.
    loading, // Loading state for cart data.
    error, // Any errors that occur during cart operations.
    totalPrice, // Total price of the items in the cart.
    cartCoursesIDs, // Array of course IDs in the cart.
    addToCart, // Function to add a course to the cart.
    removeFromCart, // Function to remove a course from the cart.
    clearCart, // Function to clear all items from the cart.
  };

  // Provide the cart data and functions to child components.
  return (
    <CartContext value={value}>
      {children}
    </CartContext>
  );
};

export default CartProvider;

// Custom hook to access the CartContext in child components.
export const useCart = (): CartContextType => {
  const context = use(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider'); // Ensure the hook is used within the CartProvider.
  }
  return context;
};