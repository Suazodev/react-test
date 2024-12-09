import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://pokeapi.co/api/v2",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

interface ApiResponse<T> {
  data: T;
  status: number;
}

const API = {
  getData: async <T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response: AxiosResponse<T> = await axiosInstance.get(
        endpoint,
        config
      );
      return { data: response.data, status: response.status };
    } catch (error: any) {
      throw error;
    }
  },

  postData: async <T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response: AxiosResponse<T> = await axiosInstance.post(
        endpoint,
        data,
        config
      );
      return { data: response.data, status: response.status };
    } catch (error: any) {
      throw error;
    }
  },

  putData: async <T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response: AxiosResponse<T> = await axiosInstance.put(
        endpoint,
        data,
        config
      );
      return { data: response.data, status: response.status };
    } catch (error: any) {
      throw error;
    }
  },
};

export default API;
