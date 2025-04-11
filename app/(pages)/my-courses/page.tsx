'use client'
// ------------ Hooks ----------------
import { usePathname, useRouter } from "next/navigation";
import { useOrders } from "@/context/OrdersContext";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
// ------------ Components ----------------
import { OrdersList } from "@/components/orders";
import { Breadcrumb } from "@/components/ui";

const MyCourses = () => {

    const path = usePathname(); // Getting the current pathname

    const { orders, loading, error } = useOrders()
    const { user, setCallbackUrl } = useAuth();

    const router = useRouter();

    useEffect(() => {
        if(!user){
            setCallbackUrl('/my-courses');
            router.push('/auth/unauthenticated');
        }
    }, [user, router]);

    return (
        <section className="px-6 sm:px-16 lg:px-40 pt-40 md:pt-24 bg-background-color dark:bg-background-dark-secondary-color">
            <Breadcrumb path={path} /> {/* Render the breadcrumb for navigation */}
            <h1 className='pt-12 text-3xl text-primary dark:text-dark-color font-bold mb-6'>
                Your Orders {/* Title for the orders section */}
            </h1>
            
            {/* Render the OrdersList component and pass orders, error, and loading states */}
            <OrdersList 
                orders={orders} 
                error={error} 
                loading={loading} 
            />
        </section>
    );
}

export default MyCourses;