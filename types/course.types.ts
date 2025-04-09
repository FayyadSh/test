export type TCourse = {
    id: string;
    title: string;
    category: string | never;
    banner: string;
    price: number;
    discount: number;
    description: string;
    students: number;
    duration: number;
}