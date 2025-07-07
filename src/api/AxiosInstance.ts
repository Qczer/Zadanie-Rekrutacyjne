import axios from 'axios';

const BASE_URL = process.env.VITE_DB_URL+'/api';

console.log(process.env.DB_URL_)
console.log('Base url: ' + BASE_URL)

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