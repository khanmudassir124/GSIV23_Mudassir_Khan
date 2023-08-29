import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import useToken from "../hooks/useToken";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL:process.env.REACT_APP_BASE_API_URL,
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
    const token = useToken();
    console.log("TOKEN:", token);
    config.headers.Accept = 'application/json'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    const { data } = response;

    if (response.status === 200) {
      return response;
    } else {
      // Handle the error scenario here if needed
      return Promise.reject(response);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
