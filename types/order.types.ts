import { TCourse } from "./course.types";

export type TOrder = {
    id?: string;
    username?: string;
    courses: TCourse[];
    date: string;
    totalPrice?: number;
}