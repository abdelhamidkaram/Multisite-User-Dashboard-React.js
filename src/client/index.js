import useSWR from "swr";
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

      if(response.data.new_token != null ){

        localStorage.setItem('token' , response.data.new_token );
        localStorage.setItem('old_path' , path );
  
      }
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


const fetcher = (url) => $api.get(url).then((res) => res.data);


export const useData = (url) => {
  const { data, error, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false, 
    revalidateOnReconnect: false, 
  });

  return {
    data,
    error,
    isLoading: !error && !data,
    mutate, 
  };
};