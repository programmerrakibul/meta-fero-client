import useAuthInfo from "./useAuthInfo";
import { useMutation } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";

const useGoogleLogin = () => {
  const { loginWithGoogle } = useAuthInfo();
  const secureAxios = useSecureAxios();
  const { mutateAsync, isPending: googleLoading } = useMutation({
    mutationKey: ["user"],
    mutationFn: async (payload) => {
      const res = await secureAxios.post("/users", payload);
      return res.data;
    },
  });

  const handleGoogleLogin = async () => {
    try {
      const userCredentials = await loginWithGoogle();

      const user = {
        name: userCredentials.user.displayName,
        email: userCredentials.user.email,
        photoURL: userCredentials.user.photoURL,
        uid: userCredentials.user.uid,
      }

      const data = await mutateAsync(user);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return { handleGoogleLogin, googleLoading };
};

export default useGoogleLogin;
