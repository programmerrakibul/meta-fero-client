import { useQuery } from "@tanstack/react-query";
import useAuthInfo from "./useAuthInfo";
import useSecureAxios from "./useSecureAxios";

const useRole = () => {
  const { currentUser } = useAuthInfo();
  const secureAxios = useSecureAxios();

  const { data: role, isPending } = useQuery({
    queryKey: ["user-role", currentUser?.email],
    queryFn: async () => {
      const { data } = await secureAxios.get(
        `/users/${currentUser?.email}/role`
      );

      if (data.success) {
        return data.role;
      }
      return data;
    },
  });

  return { role, isPending };
};

export default useRole;
