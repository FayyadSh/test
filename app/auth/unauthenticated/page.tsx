"use client";
// ------------ Image ----------------
import DoorHandleImage from '@/assets/svg/door-handle.svg';
// ------------ Components ----------------
import Link from 'next/link';
import Image from 'next/image';

const Page = () => {
  return (
    <section className="flex justify-center flex-col items-center pt-32 relative px-6 sm:px-16 lg:px-40 pb-9 bg-background-color dark:bg-background-dark-color h-screen">

      <Image
        src={DoorHandleImage}
        width={400}
        height={400}
        alt='unauthenticacted image'
      />

      <h1 className="text-3xl font-bold text-center text-primary mb-4">
        Welcome to Our App!
      </h1>
      <p className="text-gray-600 text-center mb-6">
        You are currently not authenticated. Please sign in to continue.
      </p>
      <div className="flex items-center gap-4">
        <Link
          href="/auth/register"
          className="rounded-md bg-gray-700 px-6 py-2 text-white font-medium hover:bg-primary transition duration-200"
        >
          Register
        </Link>

        <Link
          href="/auth/login"
          className="rounded-md bg-gray-800 px-6 py-2 text-white font-medium hover:bg-primary transition duration-200"
        >
          Login
        </Link>
      </div>
    </section>
  );
};

export default Page;
