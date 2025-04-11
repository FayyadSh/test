"use client";
// ------------ Hooks ----------------
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
// ------------ Firebase ----------------
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "@/lib/firebase";
// ------------ Components ----------------
import Link from "next/link";
import { FormButton } from "@/components/common";
import { SocialLoginButtons } from "@/components/common";
import { AuthenticatedUser } from "@/components/ui";

// This component represents the login page for user authentication
const Page = () => {

  // State variables for form inputs and messages
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading ] = useState(false);
  const [message, setMessage] = useState(""); 

  const { user, callbackUrl } = useAuth();

  if(user) return <AuthenticatedUser email={user?.email} />

  const router = useRouter();
  
  // Function to handle login with email and password
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page reload
    setError(null); // Clear previous errors
    setMessage('');
    setLoading(true);

    try {
      // Authenticate user using Firebase
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;

      // Check if the user's email is verified
      if (user.emailVerified) {
        
        // Display success message and store user token locally
        setMessage("Login successful");
        user.getIdToken().then((token) => {
          localStorage.setItem("token", token);
        });

        // Redirect user to the homepage

        if(callbackUrl){
          router.push(callbackUrl);
        } else {
          router.push("/");
        }
      } else {
        setError("Please verify your email");
      }
    } catch (err) {
      // Handle and display errors
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred while login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Render the login form and buttons for social login
  return (
    <div className="bg-background-secondary-color dark:bg-background-dark-secondary-color pt-20 flex flex-col justify-center items-center w-full h-full relative">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-background-color dark:bg-background-dark-color rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-primary mb-4">Sign In</h2>
          <form className="flex flex-col" onSubmit={handleLogin}>
            <div className="flex flex-col mb-4">
              {/* Input for email */}
              <label className="text-light-color mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                onChange={(event) => setEmail(event.target.value)}
                className="bg-background-secondary-color dark:bg-background-dark-secondary-color text-gray-200 border-0 rounded-md p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150"
                type="email"
                value={email}
                required
              />

              {/* Input for password */}
              <label className="text-light-color mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                className="bg-background-secondary-color dark:bg-background-dark-secondary-color text-gray-200 border-0 rounded-md p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150"
                type="password"
                value={password}
                required
              />
            </div>

            {/* Display error or success messages */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}

            {/* Links to other authentication pages */}
            <Link
              className="text-sm text-primary/30 hover:underline mt-4"
              href="/auth/forgot-password"
            >
              Forgot Password?
            </Link>
            <p className="text-light-color mt-1">
              Don't have an account?
              <Link
                className="text-sm text-primary hover:underline mt-4 ml-2"
                href="/auth/register"
              >
                Register
              </Link>
            </p>

            {/* Login button */}
            <FormButton title="Login" isPending={loading} />
          </form>

          {/* Social login buttons */}
          <SocialLoginButtons setError={setError} setMessage={setMessage} />
        </div>
      </div>
    </div>
  );
};

export default Page;
