"use client"; 
// ------------ Hooks ----------------
import { useRouter } from "next/navigation"; 
import { useActionState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
// ------------ Actions ----------------
import { resetPassword } from "@/actions/reset-password";
// ------------ Components ----------------
import { FormButton } from "@/components/common";

// Main functional component for the "Change Password" page
const Page = () => {
  
  const [state, formAction, isPending ] = useActionState(resetPassword, undefined)
  
  const router = useRouter(); // Router instance for navigation

  const { user } = useAuth();

  if(state?.success) {
    setTimeout(() => {
      router.push('/');
    }, 1000)
  }

  useEffect(() => {
    if (!user) {
      router.push('/auth/unauthenticated');
    }
  }, [user, router]);
  
  // JSX for rendering the Change Password form
  return (
    <div className="bg-background-secondary-color dark:bg-background-dark-secondary-color pt-20 flex flex-col justify-center items-center w-full h-full relative">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-background-color dark:bg-background-dark-color rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Change Password
          </h2>
          <form 
            className="flex flex-col" 
            action={formAction}
          >
            <div className="flex flex-col mb-4">
              {/* Input field for current password */}
              <label 
                htmlFor='current-password'
                className='text-slate-600 mb-1'
              >
                Current Password
              </label>
              <input
                id="current-password"
                className="bg-background-secondary-color dark:bg-background-dark-secondary-color text-gray-200 border-0 rounded-md p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150"
                type="password"
                required // Ensure input is mandatory
                name='current-password'
              />

              {/* Input field for new password */}
              <label 
                htmlFor='new-password'
                className='text-slate-600 mb-1'
              >
                New Password
              </label>
              <input 
                id='new-password'
                className="bg-background-secondary-color dark:bg-background-dark-secondary-color text-gray-200 border-0 rounded-md p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150"
                type="password"
                required // Ensure input is mandatory
                name='new-password'
              />

              {/* Input field to confirm the new password */}
              <label 
                htmlFor="confirm-new-password"
                className='text-slate-600 mb-1'
              >
                Confirm New Password
              </label>
              <input
                id='confirm-new-password'
                className="bg-background-secondary-color dark:bg-background-dark-secondary-color text-gray-200 border-0 rounded-md p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150"
                type="password"
                required // Ensure input is mandatory
                name='confirm-new-password'
              />
            </div>

            {/* Display error message if an error exists and Display success message if the operation succeeds */}
            {state?.error && <p className="text-red-500 text-sm">{state?.error}</p>}
            {state?.message && <p className="text-green-500 text-sm">{state?.message}</p>}

            {/* Submit button for changing the password */}
            <FormButton isPending={isPending} title='Reset Password' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
