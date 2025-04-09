import { TCourse } from "./course.types";

export interface EmailTemplateProps {
  userName: string;
  totalPrice: number;
  purchasedCourses: TCourse[];
}