// src/api/axiosClient.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Gắn token tự động từ AsyncStorage
axiosClient.interceptors.request.use(async (config) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// ✅ Xử lý response error nếu muốn (optional)
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Log lỗi hoặc xử lý token hết hạn ở đây
    return Promise.reject(error);
  }
);

export default axiosClient;
