import axios, { HttpStatusCode } from "axios";

export const BASE_URL = process.env.ADD_MIX_STORE_BASE_URL || "http://localhost:8080";

export const apiClient= axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // only if you need cookies/auth headers
    headers: {
        "Content-Type": "application/json"
    }
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export const addKeyToInterceptorConfigHeaders = (key, value) => {
    if (key && value) {
        apiClient.interceptors.request.use(config => {
            config.headers[key] = value;
            return config;
        })
    }
}