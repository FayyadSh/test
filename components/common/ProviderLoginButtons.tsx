"use client";
// ------------ Icons ----------------
import { Github } from "lucide-react";
import GoogleIcon from "@/assets/svg/google-icon.svg"; 
// ------------ Components ----------------
import Image from "next/image";
// ------------ Hooks ----------------
import { useRouter } from "next/navigation"; 
// ------------ Actions ----------------
import { handleGoogleLogin } from "@/actions/googleLogin"; 
import { handleGitHubLogin } from "@/actions/githubLogin";

/**
 * Interface defining the props for the SocialLoginButtons component.
 *
 * @interface SocialLoginButtonsProps
 * @property {function} setMessage - Function to set a success message.
 * @property {function} setError - Function to set an error message.
 */
interface SocialLoginButtonsProps {
  setMessage: (message: string) => void;
  setError: (error: string | null) => void;
}

/**
 * Component for social login buttons (Google and GitHub).
 *
 * @component SocialLoginButtons
 * @param {SocialLoginButtonsProps} props - The props for the SocialLoginButtons component.
 * @returns {JSX.Element} - The rendered SocialLoginButtons component.
 */
const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ setMessage, setError }) => {
  const router = useRouter(); // Initialize the router.

  /**
   * Handles Google sign-in.
   *
   * @async
   */
  const handleGoogleSignIn = async () => {
    const result = await handleGoogleLogin(); // Call the Google login action.
    if (result.success) {
      setMessage(result.message); // Set success message.
      router.push("/"); // Redirect to the home page.
    } else {
      setError(result.error); // Set error message.
    }
  };

  /**
   * Handles GitHub sign-in.
   *
   * @async
   */
  const handleGitHubSignIn = async () => {
    const result = await handleGitHubLogin(); // Call the GitHub login action.
    if (result.success) {
      setMessage(result.message); // Set success message.
      router.push("/"); // Redirect to the home page.
    } else {
      setError(result.error); // Set error message.
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center bg-zinc-400 dark:bg-slate-700 text-white font-bold py-2 px-4 rounded-md w-full mt-1.5 hover:bg-zinc-00 dark:hover:bg-slate-900 transition ease-in-out duration-150" // Styled button for Google sign-in.
      >
        Continue With Google
        <Image src={GoogleIcon} className="ml-2" width={20} height={20} alt="icon" /> {/* Google icon. */}
      </button>
      <button
        onClick={handleGitHubSignIn}
        className="flex items-center justify-center bg-slate-400 dark:bg-gray-800 text-white font-bold py-2 px-4 rounded-md w-full mt-1.5 hover:bg-slate-500 dark:hover:bg-gray-700 transition ease-in-out duration-150" // Styled button for GitHub sign-in.
      >
        Continue With GitHub
        <Github className="ml-2" /> {/* GitHub icon. */}
      </button>
    </div>
  );
};

export default SocialLoginButtons;