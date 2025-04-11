"use client";
// ------------ Hooks ----------------
import { useState, useActionState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
// ------------ Actions ----------------
import { handleLogin } from "@/actions/login";
// ------------ Components ----------------
import Link from "next/link";
import { FormButton } from "@/components/common";
import { SocialLoginButtons } from "@/components/common";
import { AuthenticatedUser } from "@/components/ui";

// This component represents the login page for user authentication
const Page = () => {

  // State variables for form inputs and messages
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState(""); 

  const { user, callbackUrl } = useAuth();

  if(user) return <AuthenticatedUser email={user?.email} />

  const router = useRouter();

  const [state, submitAction, isPending ] = useActionState(handleLogin, undefined)

  useEffect(() => {
    if(state?.success){
      localStorage.setItem('token', state?.token);
      if(callbackUrl) {
        router.push(callbackUrl);
      } else {
        router.push('/');
      }
    }
  }, [state])


  // Render the login form and buttons for social login
  return (
    <div className="bg-background-secondary-color dark:bg-background-dark-secondary-color pt-20 flex flex-col justify-center items-center w-full h-full relative">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-background-color dark:bg-background-dark-color rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Sign In
          </h2>
          <form 
            className="flex flex-col" 
            action={submitAction}
          >
            <div className="flex flex-col mb-4">
              {/* Input for email */}
              <label className="text-light-color mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                className="bg-background-secondary-color dark:bg-background-dark-secondary-color text-gray-200 border-0 rounded-md p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150"
                type="email"
                required
              />

              {/* Input for password */}
              <label className="text-light-color mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                className="bg-background-secondary-color dark:bg-background-dark-secondary-color text-gray-200 border-0 rounded-md p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150"
                type="password"
                required
              />
            </div>

            {/* Display error or success messages */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}
            {state?.message && <p className="text-green-500 text-sm">{state?.message}</p>}
            {state?.error && <p className="text-red-500 text-sm">{state?.error}</p>}

            {/* Links to other authentication pages */}
            <Link
              className="text-sm text-primary/30 hover:underline mt-4"
              href="/auth/forgot-password"
            >
              Forgot Password?
            </Link>
            <div className="text-light-color mt-1">
              Don't have an account?
              <Link
                className="text-sm text-primary hover:underline mt-4 ml-2"
                href="/auth/register"
              >
                Register
              </Link>
            </div>

            {/* Login button */}
            
            <FormButton isPending={isPending} title="Sign In" />
          </form>

          {/* Social login buttons */}
          <SocialLoginButtons setError={setError} setMessage={setMessage} />
        </div>
      </div>
    </div>
  );
};

export default Page;
