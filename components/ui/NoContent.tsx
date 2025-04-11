'use client'
// ------------ Images ----------------
import EmptyFolderImage from '@/assets/svg/empty-folder.svg';
// ------------ Components ----------------
import Image from 'next/image';

const NoContent = ({ text = 'No Courses Avaliable' }: { text?: string}) => {
    return (
        <div className="flex text-gray-300 flex-col items-center justify-center relative w-[70vw] h-[400px] mx-auto">
            <Image
                src={EmptyFolderImage}
                width={400}
                height={400}
                alt='No content image'
            />
            <h1 className="text-xl text-light-color font-semibold">
                {text}
            </h1>
        </div>
    );
}

export default NoContent;