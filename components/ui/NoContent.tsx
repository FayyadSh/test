'use client'
// ------------ Lottie ----------------
// import Lottie from "lottie-react";
// ------------ Components ----------------
import EmptyBox from '@/assets/lottie/emptyBox.json'


const NoContent = ({ text = 'No Courses Avaliable' }: { text?: string}) => {
    return (
        <div className="flex text-gray-300 flex-col items-center justify-center relative w-[70vw] h-[400px] mx-auto">
            {/* <Lottie animationData={EmptyBox} className='w-[280px]' /> */}
            <h1 className="text-xl text-light-color font-semibold">
                {text}
            </h1>
        </div>
    );
}

export default NoContent;