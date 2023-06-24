import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://apart-x-hack-4808141c8581.herokuapp.com/api/v1/",
});

axiosInstance.interceptors.request.use((reqConfig) => {
  const authToken = localStorage.getItem("access_token");

  if (authToken) {
    reqConfig.headers["Authorization"] = `Bearer ${authToken}`;
    reqConfig.headers["Content-Type"] = "application/json";
  }

  return reqConfig;
});

export const api = axiosInstance;
