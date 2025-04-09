'use client';
// ------------ Hooks ----------------
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation"; 
import { useOrders } from "@/context/OrdersContext"; 
import { useCart } from "@/context/CartContext"; 
import { useEffect } from "react";
// ------------ Components ----------------
import { Loading } from "@/components/ui"; 
import Link from "next/link";
// ------------ Icons ----------------
import { BookOpenCheck, ShoppingBasket, MoveRight, ShoppingCart } from 'lucide-react';

// Main functional component for the user profile page
const Page = () => {

  // Destructuring data and methods from the authentication context
  const { user, userData, loading, handleLogout } = useAuth();

  // Destructuring orders context
  const { orders } = useOrders();

  // Destructuring cart context
  const { cart } = useCart();

  // Router instance for navigation
  const router = useRouter();

  // Function to calculate the total number of purchased courses
  const getPurchacedCourses = () => {
    let counter = 0;
    // Loop through each order and its courses to count total courses
    orders?.forEach(order => order.courses.forEach(course => {
      counter++;
    }));
    return counter;
  };

  // Redirect user to the unauthenticated page if not logged in

  useEffect(() => {
    if (!user) {
      router.push('/auth/unauthenticated');
    }
  }, []);

 // Navigate user to the reset password page
  const handleChangePassword = () => {
    router.push("/auth/reset-password");
  };

  return (
    // Main section of the page with padding and background styles
    <section className='pt-32 relative px-6 sm:px-16 lg:px-40 pb-9 bg-background-color dark:bg-background-dark-color'>
      
      {/* Show a loading spinner if data is still loading */}
      {loading ? 
        <Loading height="screen" /> :

      // Main content block
      <div>
        {/* User avatar or placeholder circle */}
        <div className='w-16 h-16 bg-background-secondary-color dark:bg-gray-700 rounded-full flex justify-center items-center text-3xl mb-6'>
          {/* Display the first letter of the user's first name */}
          {userData?.firstName && userData?.firstName[0]}
        </div>

        {/* Welcome message */}
        <h1 className='text-2xl text-primary w-full'>
          Welcome, {userData?.firstName} {userData?.lastName}!
        </h1>

        {/* Cards to display purchased courses and cart items */}
        <div className='flex flex-col md:flex-row items-center gap-2 md:gap-6 mt-12'>

          {/* Card for purchased courses */}
          <div className='rounded-lg border dark:border-gray-800 p-5 flex flex-col jusitfy-center items-center w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
            <div className='flex flex-col items-center justify-center'>
              <BookOpenCheck className='h-12 w-12 text-gray-400 dark:text-gray-500' /> {/* Purchased courses icon */}
              <p className='text-gray-400 dark:text-gray-600'>
                {orders && orders.length > 0 ?
                  <>
                    {getPurchacedCourses()} {/* Display the total number of purchased courses */}
                    {'  '}
                    Purchased Courses
                  </> : 
                  'No Purchaced Courses Yet'
                }  
              </p>
            </div>

            {/* Link to the "My Courses" page */}
            <Link href='/my-courses' className='text-gray-50 dark:text-gray-300 w-full mt-6 bg-primary dark:bg-gray-800 rounded-md hover:bg-teal-500 dark:hover:bg-teal-700 transistion duration-300 px-5 py-2 flex gap-4 justify-center'>
              See Puarchased Courses
              <MoveRight /> {/* Icon indicating navigation */}
            </Link>
          </div>

          {/* Card for cart items */}
          <div className='rounded-lg border dark:border-gray-800 p-5 flex flex-col jusitfy-center items-center w-full md:w-1/2 lg:w-1/4'>
            <div className='flex flex-col items-center justify-center'>
              <ShoppingBasket className='h-12 w-12 text-gray-400 dark:text-gray-500' /> {/* Cart icon */}
              <p className='text-gray-400 dark:text-gray-600'>
                {cart && cart?.length > 0 ?
                  <>
                    {cart?.length} {/* Display the number of items in the cart */}
                    {'  '}
                    Courses In Cart
                  </> :
                  'Your Cart Is Empty' /* Display message if the cart is empty */
                }
              </p>
            </div>

            {/* Link to the "Cart" page */}
            <Link href='/cart' className='text-gray-50 dark:text-gray-300 w-full mt-6 bg-primary dark:bg-gray-800 rounded-md hover:bg-teal-500 dark:hover:bg-teal-700 transistion duration-300 px-5 py-2 flex gap-4 justify-center'>
              See Cart Items
              <ShoppingCart /> {/* Icon indicating navigation */}
            </Link>
          </div>
        </div>

        {/* Button to navigate to the password reset page */}
        <button
          onClick={handleChangePassword}
          className='block mt-16 bg-background-secondary-color dark:bg-gray-800 px-4 py-2 rounded-md text-gray-500 text-sm'
        >
          Reset Password
        </button>

        {/* Button to log out the user */}
        <button
          onClick={handleLogout}
          className='block mt-5 bg-blue-500 dark:bg-blue-900 px-4 py-2 rounded-md text-gray-100 text-sm'
        >
          Logout
        </button>
      </div>
    }
    </section>
  );
};

export default Page;
