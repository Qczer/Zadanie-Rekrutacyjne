import axios from 'axios';

const BASE_URL = "http://localhost:5238/api";

const AxiosInstance = axios.create({
  baseURL: BASE_URL, // Zmień na swój backend
  headers: {
    'Content-Type': 'application/json',
  },
});

AxiosInstance.interceptors.response.use(
  (response) => {
    return response; // sukces
  },
  (error) => {
    return error.response; // błąd HTTP (np. 401, 500)
  }
);

export default AxiosInstance;