"use client";
// ------------ Hooks ----------------
import { useState, useActionState } from "react";
import { useRouter } from "next/navigation";
// ------------ Actions ----------------
import { handleRegister } from "@/actions/register";
// ------------ Components ----------------
import { FormButton } from "@/components/common";
import { SocialLoginButtons } from "@/components/common";

const Page = () => {

  // State hooks for form inputs and feedback messages
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter(); // Next.js router instance for navigation

  const [state, submitAction, isPending] = useActionState(handleRegister, undefined);

  if(state?.success){
    localStorage.setItem(
      'registrationData', 
      JSON.stringify(
        {firstName, lastName }
      ));
    setTimeout(() => {
      router.push('/auth/login');
    }, 1000)
  }

  const handleNavigateToLoginPage = () => {
    router.push('/auth/login');
  };

  // JSX for rendering the sign-up form and buttons
  return (
    <div className="bg-background-secondary-color dark:bg-background-dark-secondary-color pt-20 flex flex-col justify-center items-center w-full h-full relative">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-background-color dark:bg-background-dark-color shadow-sm rounded-lg p-6">
          <h2 className="text-2xl font-bold text-primary mb-4">Sign Up</h2>

          {/* Form for email/password registration */}
          <form 
            className="flex flex-col" 
            action={submitAction}
          >
            {/* Input fields for first name, last name, email, password */}

            <div className="flex space-x-4 mb-2">
              <div className="flex flex-col">
                <label htmlFor="first-name" className="text-light-color mb-1">
                  First Name
                </label>
                <input
                  id="first-name"
                  name="firstName"
                  onChange={(event) => setFirstName(event.target.value)}
                  className="bg-background-secondary-color dark:bg-background-dark-secondary-color text-gray-200 w-full border-0 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150"
                  type="text"
                  value={firstName}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="last-name" className="text-light-color mb-1">
                  Last Name
                </label>
                <input
                  id="last-name"
                  name="lastName"
                  onChange={(event) => setLastName(event.target.value)}
                  className="bg-background-secondary-color dark:bg-background-dark-secondary-color text-gray-200 w-full border-0 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150"
                  type="text"
                  value={lastName}
                  required
                />
              </div>
            </div>

            <label htmlFor="email" className="text-light-color mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              className="bg-background-secondary-color dark:bg-background-dark-secondary-color text-gray-200 border-0 rounded-md p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150"
              type="email"
              required
            />
            <label htmlFor="password" className="text-light-color mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              className="bg-background-secondary-color dark:bg-background-dark-secondary-color text-gray-200 border-0 rounded-md p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150"
              type="password"
              required
            />
            <label htmlFor="confirm-password" className="text-light-color mb-1">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirmPassword"
              className="bg-background-secondary-color dark:bg-background-dark-secondary-color text-gray-200 border-0 rounded-md p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150"
              type="password"
              required
            />
            {/* Error and success messages */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}
            {state?.message && <p className="text-green-500 text-sm">{state?.message}</p>}
            {state?.error && <p className="text-red-500 text-sm">{state?.error}</p>}

            <p className="text-light-color mt-1">
              Already have an account?
              <button
                className="text-sm text-primary hover:underline mt-4 ml-2"
                onClick={handleNavigateToLoginPage}
              >
                Login
              </button>
            </p>

            <FormButton isPending={isPending} title="Sign Up" />
          </form>

          {/* Buttons for Google and GitHub sign-in */}
          <SocialLoginButtons setError={setError} setMessage={setMessage} />
        </div>
      </div>
    </div>
  );
};

export default Page;