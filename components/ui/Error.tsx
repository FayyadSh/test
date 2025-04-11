'use client'
// ------------ Images ----------------
import ErrorImage from '@/assets/svg/error.svg';
// ------------ Components ----------------
import Image from 'next/image';

const Error = ({error }: { error: Error | null }) => {
    return (
        <div className="flex flex-col items-center justify-center mx-auto relative">
            <Image 
                src={ErrorImage} 
                width={400} 
                height={400} 
                alt='Error image' 
            />
            <h1 className="text-xl text-light-color font-semibold">
                {error?.message}
            </h1>
        </div>
    );
}

export default Error;
