import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../core/firebase/firebaseConfig";
import { signInWithGoogle, signOutUser } from "../services/authService";

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
    const loggedInUser = await signInWithGoogle();
    setUser(loggedInUser);
  };

  const logout = async () => {
    await signOutUser();
    setUser(null);
  };

  return {
    user,
    login,
    logout,
  };
};

export default useAuth;
