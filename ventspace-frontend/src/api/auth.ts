// src/api/auth.ts

import axios from "axios";

const authApi = axios.create({
  baseURL:
    "https://blogsitte-using-fastapi.onrender.com"
});

authApi.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem(
        "access_token"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  }
);

export default authApi;