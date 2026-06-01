// src/api/auth.ts

import axios from "axios";

const authApi = axios.create({
  baseURL: "https://blogsitte-using-fastapi.onrender.com"
});

export default authApi;