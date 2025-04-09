"use server";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "@firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";

export const handleRegister = async (prev: any, formData: FormData) => {

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return {
      message: null,
      error: "Passwords do not match",
    };
  }

  try {
    
    const userCredential = await createUserWithEmailAndPassword( auth, email, password);
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