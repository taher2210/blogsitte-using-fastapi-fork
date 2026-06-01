import axios from "axios";

const userApi = axios.create({
  baseURL:
    "https://blogsitte-using-fastapi.onrender.com"
});

userApi.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem("access_token");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;
  }
);

export default userApi;