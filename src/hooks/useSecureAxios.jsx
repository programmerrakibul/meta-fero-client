import axios from "axios";
import { useEffect } from "react";
import useAuthInfo from "./useAuthInfo";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

const useSecureAxios = () => {
  const { logoutUser } = useAuthInfo();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        "tokenId"
      )}`;

      return config;
    });

    const responseInterceptor = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
          logoutUser();
          navigate("/auth/login");
        }

        return Promise.reject(err);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return instance;
};

export default useSecureAxios;
