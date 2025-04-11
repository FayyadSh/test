"use server";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "@firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { validateName, validateEmail, validatePassword, validateConfirmPassword } from "@/validators"; 

export const handleRegister = async (prev: any, formData: FormData) => {

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Use the validator functions
  const firstNameValidation = validateName(firstName, "First Name");
  if (!firstNameValidation.isValid) {
    return { message: null, error: firstNameValidation.error };
  }

  const lastNameValidation = validateName(lastName, "Last Name");
  if (!lastNameValidation.isValid) {
    return { message: null, error: lastNameValidation.error };
  }

  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    return { message: null, error: emailValidation.error };
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return { message: null, error: passwordValidation.error };
  }

  const confirmPasswordValidation = validateConfirmPassword(confirmPassword, password);
  if (!confirmPasswordValidation.isValid) {
    return { message: null, error: confirmPasswordValidation.error };
  }

  try {

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await sendEmailVerification(user);

    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      email: user.email,
    });

    const cartRef = collection(db, "Carts");
    await addDoc(cartRef, {
      userId: user.uid,
      courses: [],
      createdAt: new Date(),
    });

    return {
      success: true,
      message: "Registration successful! Please check your email for verification.",
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
      error: "An error occurred while registering. Please try again.",
    };
  }
};