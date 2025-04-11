'use client'
// ------------ Images ----------------
import ErrorImage from '@/assets/svg/error.svg';
// ------------ Components ----------------
import Image from 'next/image';


const ErrorM = ({ error } : { error: Error} ) => {

    return (
        <div className="flex flex-col bg-background-color dark:bg-background-dark-secondary-color items-center justify-center mx-auto relative w-full md:w-[70vw] h-[400px]">
            <Image
                src={ErrorImage}
                width={400}
                height={400}
                alt='Error image'
            />
            <h1 className="text-xl text-light-color font-semibold">
                { error.message }
            </h1>
        </div>
    );
}

export default ErrorM;
