"use client"; 
// ------------ Hooks ----------------
import { useRouter } from "next/navigation"; 
import { useState } from "react";
// ------------ Firebase ----------------
import { auth } from "@/lib/firebase";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "@firebase/auth";
// ------------ Components ----------------
import { FormButton } from "@/components/common";

// Main functional component for the "Change Password" page
const Page = () => {

  // State variables for input fields and feedback messages
  const [currentPassword, setCurrentPassword] = useState(""); // Stores the user's current password
  const [newPassword, setNewPassword] = useState(""); // Stores the new password
  const [confirmNewPassword, setConfirmNewPassword] = useState(""); // Confirms the new password
  const [error, setError] = useState<string | null>(null); // Stores error messages (if any)
  const [message, setMessage] = useState<string | null>(""); // Stores success messages

  const router = useRouter(); // Router instance for navigation

  // Function to handle the password change process
  const handelChangePassword = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if new password and confirmation password match
    if (newPassword !== confirmNewPassword) {
      setError("New Password Do Not Match"); // Display error if passwords do not match
      return;
    }

    try {
      const user = auth.currentUser; // Get the currently signed-in user
      if (user && user.email) {
        // Reauthenticate the user with their current password
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);

        // Update the user's password with the new password
        await updatePassword(user, newPassword);

        // Provide feedback to the user and reset the form fields
        setMessage("Password Changed Successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setError(null);

        // Navigate the user back to the homepage after success
        router.push('/');
      } else {
        // Handle cases where no user is currently signed in
        setError("No User Is Currently Signed In");
      }
    } catch (err) {
      // Handle errors and display appropriate messages
      if (err instanceof Error) {
        setError(err.message); // Set error message from the caught exception
      } else {
        setError("An Unknown Error Occurred"); // Fallback error message
      }
    }
  };

  // JSX for rendering the Change Password form
  return (
    <div className="bg-background-secondary-color dark:bg-background-dark-secondary-color pt-20 flex flex-col justify-center items-center w-full h-full relative">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-background-color dark:bg-background-dark-color rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Change Password
          </h2>
          <form className="flex flex-col" onSubmit={handelChangePassword}>
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
                onChange={(event) => setCurrentPassword(event.target.value)} // Update state on input change
                className="bg-background-secondary-color dark:bg-background-dark-secondary-color text-gray-200 border-0 rounded-md p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150"
                type="password"
                value={currentPassword}
                required // Ensure input is mandatory
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
                onChange={(event) => setNewPassword(event.target.value)} // Update state on input change
                className="bg-background-secondary-color dark:bg-background-dark-secondary-color text-gray-200 border-0 rounded-md p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150"
                type="password"
                value={newPassword}
                required // Ensure input is mandatory
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
                onChange={(event) => setConfirmNewPassword(event.target.value)} // Update state on input change
                className="bg-background-secondary-color dark:bg-background-dark-secondary-color text-gray-200 border-0 rounded-md p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150"
                type="password"
                value={confirmNewPassword}
                required // Ensure input is mandatory
              />
            </div>

            {/* Display error message if an error exists */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Display success message if the operation succeeds */}
            {message && <p className="text-green-500 text-sm">{message}</p>}

            {/* Submit button for changing the password */}

            <FormButton title="Reset Password" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
