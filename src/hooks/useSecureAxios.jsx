import axios from "axios";
import { useEffect } from "react";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

const useSecureAxios = () => {
  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      config.headers.authorization = localStorage.getItem("tokenId");

      return config;
    });

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return instance;
};

export default useSecureAxios;
