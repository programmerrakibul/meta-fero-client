import { useState } from "react";
import useAuthInfo from "./useAuthInfo";

const useGoogleLogin = () => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const { loginWithGoogle } = useAuthInfo();

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);

    try {
      await loginWithGoogle();
    } catch (err) {
      console.log(err);
    } finally {
      setGoogleLoading(false);
    }
  };

  return { handleGoogleLogin, googleLoading };
};

export default useGoogleLogin;
