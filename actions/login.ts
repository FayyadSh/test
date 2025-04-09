"use server";
import { getIdToken, signInWithEmailAndPassword } from "@firebase/auth";
import { db, auth } from "@/lib/firebase";

export const handleLogin = async (prev: any, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      message: null,
      error: "Email and password are required.",
    };
  }

  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;
    const token = await user.getIdToken();

    if (!user.emailVerified) {
      return {
        message: null,
        error: "Please verify your email.",
      };
    }

    return {
      success: true,
      message: "Login done succefull",
      token,
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: null,
        error: err.message,
      };
    }

    return {
      message: null,
      error: "An error occurred while logging in. Please try again.",
    };
  }
};