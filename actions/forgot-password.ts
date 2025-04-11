'use server';
import { sendPasswordResetEmail } from "@firebase/auth";
import { auth } from "@/lib/firebase";
import { validateEmail } from "@/validators"; 

export async function forgotPassword(perData: any, formData: FormData){
  const email = formData.get('email') as string;

  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    return { message: null, error: emailValidation.error };
  }

  try {
    // Attempt to send a password reset email using Firebase Auth
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: "Password reset link sent to your email."
    }
  } catch (err) {
    // Handle errors and set an appropriate error message
    if (err instanceof Error) {
      return {
        message: null,
        error: err.message
      }
    } else {
      return {
        message: null,
        error: "An unknown error occurred. Please try again."
      }
    }
  }
}