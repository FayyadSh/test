import { TOrderData } from "@/types";
import axiosClient from "./axiosClient"

const createOrder = (data: TOrderData) => {
    const token = localStorage.getItem('token');
    if(token){
        return axiosClient.post('orders', data, {
            headers: {
                'Authorization': `Bearer ${token}` // Add the token here
            }
        })
    }
}

const getUserOrders = () => {
    const token = localStorage.getItem('token');
    if(token){
        return axiosClient.get('orders',{
            headers: {
                'Authorization': `Bearer ${token}` // Add the token here
            }
        })
    }
}

export default {
    createOrder,
    getUserOrders
}