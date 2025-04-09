"use client";
// ------------ Hooks ----------------
import { useState } from "react";
import { useRouter } from "next/navigation";
// ------------ Firebase ----------------
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "@firebase/auth";
// ------------ Components ----------------
import { FormButton } from "@/components/common";

const Page = () => {

  // State variables for input fields and feedback messages
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Router to handle navigation
  const router = useRouter();

  // Function to handle the "Forgot Password" form submission
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state
    setMessage(null); // Reset message state

    try {
      // Attempt to send a password reset email using Firebase Auth
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent to your email."); // Display success message
      setEmail(""); // Clear the email input field

      // Optionally redirect the user to the login page after a delay
      setTimeout(() => router.push("/auth/login"), 5000);
    } catch (err) {
      // Handle errors and set an appropriate error message
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    }
  };

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
          <form className="flex flex-col" onSubmit={handleForgotPassword}>
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
                onChange={(event) => setEmail(event.target.value)} // Update email state on input change
                placeholder="Enter your email"
                className="bg-background-secondary-color dark:bg-background-dark-secondary-color text-gray-200 border-0 rounded-md p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150"
                type="email"
                value={email} // Bind input to email state
                required // Ensure the input is not empty
              />
            </div>
            {/* Display error message and success message if exists */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}
            
            {/* Submit button for resetting the password */}
            <FormButton title="Reset Password" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
