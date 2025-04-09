import { TCourse } from "./course.types";

export type TCartItem = {
    course: TCourse;
    removeFromCart: (course: TCourse) => void;
  }