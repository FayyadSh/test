'use client'
// ------------ Components ----------------
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import ColorModeSelector from './ColorModeSelector';
import DropdownMenu from "./DropdownMenu";
import { SearchInput } from "../index";
import { Suspense } from "react";
// ------------ Icons ----------------
import { 
  Brush, ChevronDown, ChevronUp, Database, Menu, ShoppingCart, 
  Smartphone, TestTubeDiagonal, X, SearchCode, SearchSlash
} from "lucide-react";

// ------------ Hooks ----------------
// Importing React hooks for state management 
import { useEffect, useState } from "react";

// Importing custom hooks for authentication and cart management
import { useAuth } from '@/context/AuthContext';
import { useCart } from "@/context/CartContext";
import { useNavActive } from "@/hooks";


const NavbarWithoutWrappingBySuspense = () => {

  // ------------ State Variables ----------------
  // State variables to manage the visibility of cart, WithoutWrappingBySuspense, dropdown, search bar, and auth dropdown
  const [openCart, setOpenCart] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);

    // Initialize showNavbar based on screen size
    const [showNavbar, setShowNavbar] = useState(() => {
      // This will only run on the client side
      if (typeof window !== 'undefined') {
        return window.innerWidth >= 1024; // lg breakpoint (1024px)
      }
      return false; // default to false for SSR
    });

  // ------------ Helper Functions ----------------
  // Determines if the link should be marked as active based on the current path
  const { isActive } = useNavActive();

  // ------------ Context Data ----------------
  // Extracting user data and cart-related information from context
  const { user, userData, handleLogout } = useAuth();
  const { cart, loading, error } = useCart();

  // Toggles the visibility of the navbar
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
    setShowDropdown(false);
  };

  // Toggles the visibility of the search bar
  const handleShowSearchBar = () => {
    setShowSearchBar(prev => !prev);
  };

  const closeCart = () => {
    setOpenCart(false)
  }

  const handleShowDropdown = () => {
    setShowDropdown(prev => !prev);
  }

  const handleShowAuthDropdown = () => {
    setShowAuthDropdown(prev => !prev)
  }

  const handleOpenCart = () => {
    setOpenCart(prev => !prev)
  }

  // Effect to hide the auth dropdown if the user is not logged in
  useEffect(() => {
    if (!user) setShowAuthDropdown(false);
  }, [user, handleLogout]);

  return (
      <header className="bg-background-color fixed w-[100vw] dark:bg-background-dark-color transition-all shadow-md z-30">
        <div className="mx-auto flex h-[70px] max-w-screen-xl items-center px-4 sm:px-6 lg:px-8">

          {/* Logo and branding */}
          <Link className="text-primary flex items-center gap-3" href="/">
            <Image src='/logo.svg' width={35} height={35} alt="logo" />
            <h1 className="text-xl hidden md:block font-extrabold h-[30px] tracking-wide">
              CodeSphere
            </h1>
          </Link>

          <div className="flex flex-1 items-center justify-end lg:justify-between">

            {/* Navbar links */}
            <nav className={`flex flex-col absolute lg:relative -top-[320px] gap-1 lg:gap-0 lg:top-11 rounded-b-lg z-30 transition-all ${!showNavbar ? '-mt-80' : 'mt-[390px]'} lg:-mt-2 lg:bg-transparent lg:flex-row text-light-color lg:items-center text-sm`}>

              {/* Home link */}
              <Link className={`${isActive('')} ${showNavbar ? '-right-8' : '-right-[2000px]'} relative h-[100px] lg:h-[15px] text-center bg-background-color w-[300px] dark:bg-background-dark-secondary-color shadow-primary pt-10 shadow-md transition-all duration-200 ease-out opacity-95 lg:shadow-none lg:bg-transparent lg:-top-16 lg:pb-2 lg:w-[70px] lg:dark:bg-transparent font-semibold navlink-clip-path md:clip-none`} href="/">
                Home
              </Link>

              {/* My Courses link */}
              <Link className={`${isActive('my-courses')} ${showNavbar ? '-right-10' : '-right-[2000px]'} relative h-[100px] lg:h-[15px] text-center bg-background-color w-[300px] dark:bg-background-dark-secondary-color shadow-primary pt-10 shadow-md transition-all duration-300 ease-out opacity-95 lg:shadow-none lg:bg-transparent lg:-top-16 lg:pb-2 lg:w-[70px] lg:dark:bg-transparent font-semibold text-nowrap mr-3 navlink-clip-path md:clip-none`} href="/my-courses">
                My Courses
              </Link>

              {/* About Us link */}
              <Link className={`${isActive('about-us')} ${showNavbar ? '-right-12' : '-right-[2000px]'} relative h-[100px] lg:h-[15px] text-center bg-background-color w-[300px] dark:bg-background-dark-secondary-color shadow-primary pt-10 shadow-md transition-all duration-500 ease-out opacity-95 lg:shadow-none lg:bg-transparent lg:-top-16 lg:pb-2 lg:w-[70px] lg:dark:bg-transparent font-semibold navlink-clip-path md:clip-none`} href="/about-us">
                About Us
              </Link>

              {/* Subjects dropdown toggle */}
              <button
                onClick={handleShowDropdown}
                className={`${isActive(`search`)} ${showNavbar ? '-right-14' : '-right-[2000px]'} relative h-[100px] lg:h-[15px] text-center bg-background-color w-[300px] dark:bg-background-dark-secondary-color shadow-primary pt-0 shadow-md transition-all duration-700 ease-out opacity-95 lg:shadow-none lg:bg-transparent lg:-top-9 lg:pb-1 lg:w-[90px] lg:dark:bg-transparent font-semibold flex justify-center items-center gap-2 navlink-clip-path md:clip-none`}
              >
                <p>Subjects</p>
                {showDropdown ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
            </nav>

            {/* Subjects dropdown menu */}
            {showDropdown && showNavbar &&
              <div className="absolute top-[450px] right-9 lg:right-1/2 lg:top-16 z-40">
                <ul className='bg-background-color dark:bg-background-dark-secondary-color text-dark-color p-4 rounded-lg shadow-lg'>
                  <Link className={`cursor-pointer flex gap-4 mb-3 ${isActive('search?category=frontend')}`} href='/search?category=frontend'>
                    <Brush /> Frontend
                  </Link>

                  <Link className={`cursor-pointer flex gap-4 mb-3 ${isActive('search?category=backend')}`} href='/search?category=backend'>
                    <Database /> Backend
                  </Link>

                  <Link className={`cursor-pointer flex gap-4 mb-3 ${isActive('search?category=mobile-development')} `} href='/search?category=mobile-development'>
                    <Smartphone /> Mobile
                  </Link>

                  <Link className={`cursor-pointer flex gap-4 ${isActive('search?category=testing')} `} href='/search?category=testing'>
                    <TestTubeDiagonal /> Testing
                  </Link>
                </ul>
              </div>
            }

            {/* User dropdown menu */}
            <DropdownMenu
              showDropdown={showAuthDropdown}
              userData={userData}
              handleLogout={handleLogout}
              userName={user?.displayName}
            />

            {/* Search input */}
            <SearchInput
              otherClasses={`!w-screen -translate-x-14 md:translate-x-0 md:!w-2/3 xl:!w-1/2 absolute md:right-3 ${showSearchBar ? 'top-[34px] opacity-100' : '-top-64 opacity-0'} transition-opacity duration-300 md:-top-4 h-9 text-xs tracking-widest dark:text-gray-400 absolute rounded-none md:rounded-md placeholder-gray-500 pl-6 md:pl-3 border-b border-b-primary/30 md:border-none`}            
              iconClasses={`max-md:!-right-full md:!right-5 top-[40px] md:-top-[10px] opacity-${showSearchBar ? '100' : '0'} ${user || userData ? 'max-sm:!-right-57' : 'max-sm:!-right-52'}  transition-all duration-150`}
            />

            <div className="flex items-center gap-4">

              {/* Toggle search bar */}
              <button onClick={handleShowSearchBar} >
                {showSearchBar ?
                  <SearchSlash className='text-gray-400 block md:hidden' />
                  :
                  <SearchCode className='text-gray-400 block md:hidden' />
                }
              </button>

              {/* Theme switcher */}
              <ColorModeSelector />

              {/* Conditional rendering for authentication and cart */}
              {!user ?
                <div className="sm:flex sm:gap-4">
                  <Link className="block rounded-lg bg-primary dark:bg-primary/70 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary/70 dark:hover:bg-primary/85" href="/auth/login">
                    Login
                  </Link>

                  <Link className="hidden rounded-lg bg-background-secondary-color dark:bg-background-dark-secondary-color px-5 py-2.5 text-sm font-medium text-primary transition hover:text-primary/50 sm:block" href="/auth/register">
                    Register
                  </Link>
                </div>
                :
                <div className="flex items-center gap-5">
                  {/* Shopping cart icon with cart count */}
                  <div className="flex gap-1 text-light-color cursor-pointer">
                    <ShoppingCart onClick={handleOpenCart} />
                    <div className='relative -top-3.5 right-2'>
                      {cart?.length}
                    </div>
                  </div>

                  {/* User initials as a button to toggle auth dropdown */}
                  <div
                    onClick={handleShowAuthDropdown}
                    className='bg-background-secondary-color dark:bg-background-dark-secondary-color text-primary w-10 h-10 rounded-full flex justify-center items-center cursor-pointer font-mono hover:bg-background-secondary-color/60 hover:dark:bg-background-dark-secondary-color/60'
                  >
                    {user?.displayName ? 
                      user?.displayName [0] 
                      : 
                      userData?.firstName && userData?.firstName[0]
                    }
                  </div>

                  {/* Render cart component if open */}
                  {openCart && (
                    <Cart
                      courses={cart ? cart : []}
                      loading={loading}
                      error={error}
                      closeCart={closeCart}
                    />
                  )}
                </div>
              }

              {/* Hamburger menu for mobile */}
              <button
                onClick={handleShowNavbar}
                className="block rounded bg-background-secondary-color p-2.5 dark:bg-background-dark-secondary-color text-primary/70 transition hover:text-dark-color lg:hidden"
              >
                {showNavbar ? <X /> : <Menu />}
              </button>

            </div>
          </div>
        </div>
      </header>
  );
};

const Navbar = () => {
  return (
    <Suspense fallback={<div className="w-screen bg-background-color h-[70px] dark:bg-background-dark-color z-30"/>}>
      <NavbarWithoutWrappingBySuspense />
    </Suspense>
  )
}

export default Navbar;
