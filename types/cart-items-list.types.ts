import { TCourse } from "./course.types";

export type TCartItemsList = {
  courses: TCourse[];
  loading: boolean;
  error: null | Error;
  total: number;
  removeFromCart: (course: TCourse) => void; // Function to remove a course from the cart
}
