import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../../core/firebase/firebaseConfig";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const credential = await signInWithPopup(auth, googleProvider);
  return credential.user;
};

export const signOutUser = async () => {
  await signOut(auth);
  return null;
};

export const getCurrentUser = () => {
  return auth.currentUser;
};
