import { TCourse } from "./course.types";

export type TCoursesList = {
    courses: TCourse[];
    loading?: boolean;
    error?: Error | null;
}