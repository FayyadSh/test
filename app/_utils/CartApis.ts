import { TCartAction } from "@/types";
import axiosClient from "./axiosClient"

const getUserCart = () => {
    const token = localStorage.getItem('token'); // Fetch directly from localStorage
    if(token) {
        return axiosClient.get('cart', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
};

const updateUserCart = (data: TCartAction) => {
    const token = localStorage.getItem('token'); // Fetch directly from localStorage
    if(token){
        return axiosClient.patch('cart', data, {
            headers: {
                'Authorization': `bearer ${token}` // Add the token here
            }
        })
    }
}
export default {
    getUserCart,
    updateUserCart
}