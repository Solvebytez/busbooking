import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Base URL for the API
  headers: {
    'Content-Type': 'application/json', // Set default content type
  },
  timeout: 10000, // Set a timeout for requests
});

// Add a request interceptor if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authentication tokens or other headers if required
    // Example:
    // config.headers.Authorization = `Bearer ${yourAuthToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor if needed
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error('API error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;