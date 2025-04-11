"use client";
// ------------ Components ----------------
import { useState } from "react"; 
import { useRouter } from "next/navigation"; 
import { useAuth } from "@/context/AuthContext";
// ------------ Firebase ----------------
import { createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth"; 
import { auth, db } from "@/lib/firebase"; 
import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 
// ------------ Components ----------------
import { FormButton } from "@/components/common";
import { SocialLoginButtons } from "@/components/common";
import { AuthenticatedUser } from "@/components/ui";
// ------------ types ----------------
import { FormEvent } from "react";

const Page = () => {

  // State hooks for form inputs and feedback messages
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [error, setError] = useState<string | null>("");
  const [message, setMessage] = useState<string | null>("");

  const router = useRouter(); // Next.js router instance for navigation

  const { user } = useAuth();

  if(user) return <AuthenticatedUser email={user?.email} />

  // Handle the form submission for email/password registration
  const handleRegister = async (event: FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setError(null); // Clear any existing errors
    setMessage(null); // Clear any existing success messages

    // Validate that the passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match"); // Show an error if passwords differ
    }

    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword( auth, email, password );
      const user = userCredential.user;

      // Send a verification email to the user
      await sendEmailVerification(user);

      await setDoc(doc(db, "users", user.uid), {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
      });

      // Save user information temporarily in localStorage
      localStorage.setItem(
        "registrationData",
        JSON.stringify({ firstName, lastName })
      );

      // Create an empty shopping cart for the new user in Firestore
      const cartRef = collection(db, "Carts");
      await addDoc(cartRef, {
        userId: user.uid,
        courses: [],
        createdAt: new Date(),
      });

      setMessage("Registration successful"); // Show success message

      // Reset the form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redirect the user to the homepage
      router.push("/");
    } catch (err) {
      // Handle registration errors
      if (err instanceof Error) {
        setError(err.message); // Display the error message
      } else {
        setError("An error occurred while registering. Please try again.");
      }
    }
  };

  const handleNavigateToLoginPage = () => {
    router.push('/auth/login')
  }

  // JSX for rendering the sign-up form and buttons
  return (
    <div className="bg-background-secondary-color dark:bg-background-dark-secondary-color pt-20 flex flex-col justify-center items-center w-full h-full relative">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-background-color dark:bg-background-dark-color shadow-sm rounded-lg p-6">
          <h2 className="text-2xl font-bold text-primary mb-4">Sign Up</h2>

          {/* Form for email/password registration */}
          <form className="flex flex-col" onSubmit={handleRegister}>
            {/* Input fields for first name, last name, email, password */}

            <div className="flex space-x-4 mb-2">
              <div className="flex flex-col">
                <label
                  htmlFor="first-name"
                  className="text-light-color mb-1"
                >
                  First Name
                </label>
                <input
                  id="first-name"
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
              onChange={(event) => setEmail(event.target.value)}
              className="bg-background-secondary-color dark:bg-background-dark-secondary-color text-gray-200 border-0 rounded-md p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150"
              type="email"
              value={email}
              required
            />
            <label htmlFor="password" className="text-light-color mb-1">
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
            <label htmlFor="confirm-password" className="text-light-color mb-1">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="bg-background-secondary-color dark:bg-background-dark-secondary-color text-gray-200 border-0 rounded-md p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150"
              type="password"
              value={confirmPassword}
              required
            />
            {/* Error and success messages */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}

            <p className="text-light-color mt-1">
              Already account?
              <button
                className="text-sm text-primary hover:underline mt-4 ml-2"
                onClick={handleNavigateToLoginPage}
              >
                Login
              </button>
            </p>

            <FormButton title="Sign Up" />
          </form>

          {/* Buttons for Google and GitHub sign-in */}
          <SocialLoginButtons setError={setError} setMessage={setMessage} />
        </div>
      </div>
    </div>
  );
};

export default Page;
