'use client'
// ------------ Lottie ----------------
// import Lottie from "lottie-react";
// ------------ Components ----------------
import ErrorLottie from '@/assets/lottie/error.json'

const Error = ({error }: { error: Error | null }) => {
    return (
        <div className="flex flex-col items-center justify-center mx-auto relative w-[70vw] h-[400px]">
            {/* <Lottie animationData={ErrorLottie} className='w-[280px]' /> */}
            <h1 className="text-xl text-light-color font-semibold">
                {error?.message}
            </h1>
        </div>
    );
}

export default Error;
