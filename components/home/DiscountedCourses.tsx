'use client';
// ------------ Hooks ----------------
import { useEffect, useState } from 'react';
import useFetch from '@/hooks/useFetch';
// ------------ Components ----------------
import { CoursesList } from '../common';
// ------------ Utils ----------------
import CoursesApi from '@/app/_utils/CoursesApi';
// ------------ Types ----------------
import { TCourse } from '@/types';

const DiscountedCourses: React.FC = () => {
  
  // State for sorting category and filtered courses
  const [sort, setSort] = useState<string>('all');
  const [filteredCourses, setFilteredCourses] = useState<TCourse[]>([]); // Typed state for filtered data
  const [categories, setCategories] = useState<string[]>([]); // State for dynamic categories

  // Fetch discounted courses using useFetch
  const { data: discountedCourses, loading, error } = useFetch<TCourse[]>(() => CoursesApi.getDiscountedCourses());

  // Effect to filter courses based on selected category or 'all'
  useEffect(() => {
    filterCourses();
  }, [sort, discountedCourses]);

  // Effect to extract categories when discountedCourses change
  useEffect(() => {
    if (discountedCourses) {
      const uniqueCategories = Array.from(
        new Set(discountedCourses.map((course) => course.category.toLowerCase()))
      );
      setCategories(['all', ...uniqueCategories]); // Add 'all' to the start
    }
  }, [discountedCourses]);

  // Function to filter courses based on selected category or return all
  const filterCourses = () => {
    if (sort === 'all') {
      setFilteredCourses(discountedCourses || []); // Ensure no undefined issues
    } else {
      setFilteredCourses(
        discountedCourses?.filter(
          (course) => course.category.toLowerCase() === sort.toLowerCase()
        ) || []
      );
    }
  };

  return (
    <div className="relative px-6 sm:px-16 lg:px-40 bg-background-color dark:bg-background-dark-color pb-20">
      {/* Render only if there are available courses */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-primary">Exclusive Deals</h1>

        {/* Dynamic Category selection buttons */}
        <div className="flex items-center flex-wrap gap-4 text-white dark:text-gray-300 z-20">
          {categories.map(category => (
            <h2
              key={category}
              onClick={() => setSort(category)}
              className={`bg-primary/30 dark:bg-slate-800 whitespace-nowrap p-2 rounded-md cursor-pointer hover:bg-primary dark:hover:bg-primary/70 ${
                sort === category ? '!bg-primary dark:!bg-primary/70' : ''
              } `}
            >
              {category === 'all'
                ? 'All Courses'
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </h2>
          ))}
        </div>
      </div>

      {/* Course list component to display filtered courses */}
      <CoursesList 
        courses={filteredCourses} 
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default DiscountedCourses;