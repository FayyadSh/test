export type TCartAction = {
    action: 'add' | 'remove' | 'clear';
    courseId?: string;
}