import axios from 'axios';

const BASE_URL = 'zadanierekrutacyjne-bdf0dqexb7hzdjcd.polandcentral-01.azurewebsites.net/api';

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
    console.error(error)
    return error.response; // błąd HTTP (np. 401, 500)
  }
);

export default AxiosInstance;