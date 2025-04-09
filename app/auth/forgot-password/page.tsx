"use client";
// ------------ Hooks ----------------
import { useActionState } from "react";
import { useRouter } from "next/navigation";
// ------------ Actions ----------------
import { forgotPassword } from "@/actions/forgot-password";
// ------------ Components ----------------
import { FormButton } from "@/components/common";

const Page = () => {

  const [state, formAction, isPending ] = useActionState(forgotPassword, undefined);

  // Router to handle navigation
  const router = useRouter();

  if(state?.success) {
    setTimeout(() => {
      router.push('/');
    }, 1000)
  }

  return (
    <div className="bg-background-secondary-color dark:bg-background-dark-secondary-color pt-20 flex flex-col justify-center items-center w-full h-full relative">
      {/* Main container for the page */}
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-background-color dark:bg-background-dark-color rounded-lg shadow-md p-6">
          {/* Page title */}
          <h2 className="text-2xl font-bold text-primary mb-4">
            Forgot Password
          </h2>
          {/* Forgot Password form */}
          <form 
            className="flex flex-col" 
            action={formAction}
          >
            <div className="flex flex-col mb-4">
              {/* Email input field */}
              <label
                htmlFor="email"
                className="text-light-color mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name='email'
                className="bg-background-secondary-color dark:bg-background-dark-secondary-color text-gray-200 border-0 rounded-md p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150"
                required // Ensure the input is not empty
              />
            </div>
            {/* Display error message and success message if exists */}
            {state?.error && <p className="text-red-500 text-sm">{state?.error}</p>}
            {state?.message && <p className="text-green-500 text-sm">{state?.message}</p>}

            {/* Submit button for resetting the password */}
            <FormButton isPending={isPending} title="Reset Password" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
