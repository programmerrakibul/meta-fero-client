import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { auth } from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUserWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logoutUser = () => {
    return signOut(auth);
  };

  const updateUserProfile = (update) => {
    return updateProfile(auth.currentUser, update);
  };

  useEffect(() => {
    const onSubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true);
      if (user) {
        localStorage.setItem("tokenId", user.accessToken);
        setCurrentUser(user);
      } else {
        localStorage.removeItem("tokenId");
        setCurrentUser(null);
      }

      setLoading(false);
    });

    return () => onSubscribe();
  }, []);

  const authInfo = {
    currentUser,
    createUser,
    loginUserWithEmail,
    loginWithGoogle,
    logoutUser,
    updateUserProfile,
  };

  return (
    <AuthContext value={authInfo}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext>
  );
};

export default AuthProvider;
