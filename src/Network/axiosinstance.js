// src/Network/axiosInstance.js
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
});

// Dynamically inject the latest token before every request
axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Optional: handle responses globally (e.g. redirect on 401)
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // You could do automatic logout on 401 if desired
    return Promise.reject(error);
  }
);
