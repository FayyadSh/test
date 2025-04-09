'use client'
// ------------ Lottie ----------------
// import Lottie from 'lottie-react';
import Confirm from '@/assets/lottie/done.json'
// ------------ Components ----------------
import Link from 'next/link';

const PaymentConfirm = () => {
    return (
        <div className='flex flex-col bg-background-color dark:bg-background-dark-secondary-color items-center justify-between px-5 py-32'>
            {/* <Lottie animationData={Confirm} /> */}
            <h2 className='text-[24px] text-gray-500 mt-7'>
                Payment Successful
            </h2>
            <h2 className='text-[17px] text-center mt-3 text-light-color'>
                We sent an email with your order confirmation along with digital content
            </h2>
            <Link href='/' className='p-2 mt-6 text-white rounded-md bg-primary'> 
                Go To Home 
            </Link>
        </div>
    );
}

export default PaymentConfirm;
