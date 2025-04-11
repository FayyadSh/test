"use server";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "@/lib/firebase";
import { validateEmail, validatePassword } from "@/validators"; // استيراد الدوال المساعدة

export const handleLogin = async (prev: any, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // استخدام دوال التحقق
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    return { message: null, error: emailValidation.error };
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return { message: null, error: passwordValidation.error };
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
      message: "Login successful",
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