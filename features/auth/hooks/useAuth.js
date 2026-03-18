import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../core/firebase/firebaseConfig";
import { signInWithGoogle, signOutUser } from "../services/authService";
import { notify } from "../../../shared/utils/notify";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async () => {
    try {
      const loggedInUser = await signInWithGoogle();
      setUser(loggedInUser);
      notify({
        title: "Welcome back",
        message: "Google sign-in successful.",
        type: "success",
      });
    } catch {
      notify({
        title: "Sign-in failed",
        message: "Could not sign in with Google.",
        type: "error",
      });
    }
  };

  const logout = async () => {
    try {
      await signOutUser();
      setUser(null);
      notify({
        title: "Signed out",
        message: "You have been logged out.",
        type: "info",
      });
    } catch {
      notify({
        title: "Sign-out failed",
        message: "Please try again.",
        type: "error",
      });
    }
  };

  return {
    user,
    login,
    logout,
  };
};

export default useAuth;
