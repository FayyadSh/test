import { TOrder } from "./order.types"

export type TOrdersList = {
    orders: TOrder[] | undefined;
    loading: boolean;
    error: Error | null;
}