'use client'
// ------------ Hooks ----------------
import { usePathname, useRouter } from 'next/navigation';
// ------------ Components ----------------
import { Breadcrumb } from '@/components/ui';
import { SearchInput } from '@/components/common';

const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => {

  const router = useRouter(); // Accessing the router for navigation
  const path = usePathname(); // Getting the current pathname

  const handleNavigation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target.value; // Getting the selected category
    if (target) {
      router.push(target); // Navigating to the selected category
    }
  };

  return (
    <div className='px-6 sm:px-16 lg:px-40 pt-40 md:pt-24 bg-background-color dark:bg-background-dark-color'>
      <Breadcrumb path={path} />
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        {/* SearchInput now takes up remaining space */}
        <div className='flex-1 md:mr-4'>
          <SearchInput otherClasses='!focus:outline-none !text-[12px] w-full' />
        </div>
        
        {/* Select box with fixed width */}
        <div className='w-full md:w-1/4'>
          <select 
            className='cursor-pointer w-1/2 md:w-full p-2 pr-8 bg-background-secondary-color dark:bg-background-dark-secondary-color text-light-color rounded-lg border-none outline-none appearance-none bg-no-repeat bg-[position:right_0.5rem_center] bg-[length:1.5em_1.5em]'
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2301d2cf'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E\")"
            }}
            onChange={handleNavigation} 
            defaultValue=""
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value='/search?category=web-development'>Frontend</option>
            <option value='/search?category=backend'>Backend</option>
            <option value='/search?category=mobile-development'>Mobile Development</option>
            <option value='/search?category=desktop'>Desktop</option>
            <option value='/search?category=data-science'>Data Science</option>
            <option value='/search?category=cyber-security'>Cyber Security</option>
          </select>
        </div>
      </div>
      {children} {/* Rendering the children components */}
    </div>
  );
}

export default Layout;