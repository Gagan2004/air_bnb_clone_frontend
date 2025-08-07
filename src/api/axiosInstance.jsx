import axios from 'axios';
  
  const axiosInstance = axios.create({
    // baseURL: "https://air-bnb-clone-backend.onrender.com/api",
    baseURL:"http://localhost:5000/api",
    headers: {
      'Content-Type': 'application/json',
    },
  });

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log("Token being sent:", token);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;