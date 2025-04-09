import {
  BestSellingCourses,
  DiscountedCourses,
  Hero,
  NewCourses,
  Overview,
} from "@/components/home";

export default function Home() {
  return (
    <main>
      <Hero />
      <BestSellingCourses />
      <NewCourses />
      <DiscountedCourses />
      <Overview />
    </main>
  );
}
