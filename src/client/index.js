import axios from "axios";
import NProgress from "nprogress";
const path = localStorage.getItem('path');

const axiosInstance = (baseUrl) => {

  const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: false,
  });

  instance.interceptors.request.use((config) => {
    NProgress.start();

    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = "Bearer " + token;
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      NProgress.done();
      return response;
    },
    (error) => {
      NProgress.done();
      return Promise.reject(error);
    }
  );

  return instance;
};

export const $api = axiosInstance(path);
