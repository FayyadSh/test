'use client'; // Marking this as a Client Component hook since it uses navigation hooks

// Next.js navigation hooks
import { usePathname, useSearchParams } from "next/navigation";

/**
 * useNavActive Custom Hook
 * 
 * Provides functionality to determine active navigation state based on:
 * - Current route path
 * - URL search parameters (category and query)
 * 
 * @returns {Object} An object containing the isActive function
 */
const useNavActive = () => {
  // Get current route path and search parameters
  const pathname = usePathname(); // Current URL path (e.g., '/search')
  const searchParams = useSearchParams(); // URL search parameters object

  /**
   * Determines the active state styling for navigation items
   * 
   * @param {string} href - The navigation item's href to check against current route
   * @returns {string} CSS class string indicating active/hover state
   */
  const isActive = (href: string) => {
    // Extract the base path (first segment of URL)
    const currentPath = pathname.split('/')[1];
    
    // Get current category from search params if exists
    const currentCategory = searchParams.get('category');
    
    // Check if there's a search query parameter
    const hasSearchQuery = searchParams.has('query'); // Proper way to check for query param

    /**
     * State determination logic:
     * Uses switch(true) for complex conditional matching
     * Cases are evaluated in order (first match wins)
     */
    switch (true) {
      // Special case: Don't highlight "Subjects" if there's a search query
      case (href === 'search' && currentPath === 'search' && hasSearchQuery):
        return 'hover:text-primary'; // Only show hover state
        
      // Case 1: Exact match for search base path
      case (href.startsWith('search') && currentPath === 'search' && href === 'search'):
      // Case 2: Category match in search params
      case (href.split('search?category=')[1] === currentCategory):
      // Case 3: Exact path match
      case (currentPath === href):
        return 'text-primary'; // Active state styling
      
      // Default case: Show hover state only
      default:
        return 'hover:text-primary';
    }
  };

  // Return the isActive function for component usage
  return { isActive };
};

export default useNavActive;