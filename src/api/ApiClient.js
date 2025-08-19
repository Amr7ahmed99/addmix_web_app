import axios, { HttpStatusCode } from "axios";

export const BASE_URL = process.env.ADD_MIX_STORE_BASE_URL || "http://localhost:8080";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, //important for cookies
  headers: {
    "Content-Type": "application/json"
  }
});

// Request interceptor: attach access token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Flag to avoid multiple refresh calls in parallel
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor: handle 401 and retry
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401, try refresh
    if (error.response?.status === HttpStatusCode.Unauthorized && !originalRequest._retry) {
      if (isRefreshing) {
        // queue requests until refresh finishes
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient.request(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // call refresh endpoint (cookie auto-sent)
        const res = await apiClient.post("/api/auth/refresh", {}, { withCredentials: true });

        const newToken = res.data.accessToken;

        localStorage.setItem("token", newToken);
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

        processQueue(null, newToken);

        // retry failed request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient.request(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // refresh failed → clear & redirect
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// helper to add custom headers
export const addKeyToInterceptorConfigHeaders = (key, value) => {
  if (key && value) {
    apiClient.interceptors.request.use(config => {
      config.headers[key] = value;
      return config;
    });
  }
};
