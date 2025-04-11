'use client';
// ------------ Hooks ----------------
import { usePathname, useRouter } from "next/navigation";
import { useCart } from '@/context/CartContext';
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
// ------------ Components ----------------
import { Breadcrumb } from "@/components/ui";
import { CartItemsList } from "@/components/cart";
// ------------ Types ----------------
import { TCourse } from "@/types";

/**
 * Cart Page Component
 * Displays the user's shopping cart with items, total price, and checkout functionality
 * Handles authentication and redirects unauthenticated users
 */
const Cart = () => {
  // Get current path for breadcrumb navigation
  const path = usePathname();
  
  // Cart context with cart items, total price, and cart actions
  const { 
    cart,          // Array of cart items
    totalPrice,    // Calculated total price
    loading,       // Loading state
    error,         // Error state
    removeFromCart // Function to remove items from cart
  } = useCart();

  // Authentication context
  const { user, setCallbackUrl } = useAuth();

  // Router for navigation
  const router = useRouter();

  // Redirect unauthenticated users to auth page
  useEffect(() => {
    if(!user){
      setCallbackUrl('/cart');
      router.push('/auth/unauthenticated');
    }
  }, []);
  
  return (
    /** 
     * Main section container with responsive padding and dark mode support
     * @className - Background colors adapt to light/dark mode
     */
    <section className="pt-40 md:pt-24 bg-background-color dark:bg-background-dark-color">
      
      {/* Content container with responsive horizontal padding */}
      <div className="px-6 sm:px-16 lg:px-40">
        
        {/* Breadcrumb showing current path */}
        <Breadcrumb path={path} /> 
        
        {/* Page title with responsive font sizing */}
        <h1 className="text-xl font-bold text-light-color sm:text-3xl"> 
          Your Cart
        </h1>

        {/* Cart items list component with all cart data and actions */}
        <CartItemsList 
          courses={cart as TCourse[]}  // Cast cart items to TCourse type
          loading={loading}           // Pass loading state
          error={error}               // Pass error state
          total={totalPrice}         // Pass calculated total
          removeFromCart={removeFromCart} // Pass removal function
        />
      </div>
    </section>
  );
};

export default Cart;