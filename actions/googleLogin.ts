// src/actions/auth/googleAuth.ts
import { signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, collection, addDoc } from "firebase/firestore";
import { TAuthResponse } from "@/types";

export const handleGoogleLogin = async () : Promise<TAuthResponse> => {
  const provider = new GoogleAuthProvider();

  try {

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if the user document exists in Firestore
    const userDocRef = doc(db, 'Users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // Save user data to Firestore if not already present
      await setDoc(userDocRef, {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
      });

      // Create an empty cart for the user in Firestore
      const cartRef = collection(db, "Carts");
      await addDoc(cartRef, {
        userId: user.uid,
        courses: [],
        createdAt: new Date(),
      });
    }

    // Store user token locally and redirect
    user?.getIdToken().then((token) => {
      localStorage.setItem("token", token);
    });

    return { success: true, message: "Signed in with Google successfully.", error: null };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message, message: '' };
    }
    return { success: false, error: "An error occurred while logging in with Google.", message: '' };
  }
};