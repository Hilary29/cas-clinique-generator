import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Changez avec votre URL backend si différent
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
