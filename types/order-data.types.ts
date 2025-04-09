import { TOrder } from './order.types';

export type TOrderData = Omit<TOrder, 'courses'> & {
  courses: string[];  
}