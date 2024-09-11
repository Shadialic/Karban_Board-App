
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL, 
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("KanbanToken"); 
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete config.headers["Authorization"]; 
    }
    config.headers["Content-Type"] = "application/json"; 
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
