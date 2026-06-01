import axios from "axios";

const commentApi = axios.create({
  baseURL:
    "https://comment-service-agtv.onrender.com"
});

commentApi.interceptors.request.use(
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

export default commentApi;