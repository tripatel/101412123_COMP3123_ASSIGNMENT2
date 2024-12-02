import axios from 'axios';

// Set up Axios base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8084/api/v1/emp/',  // Adjust the URL according to your backend
});

export default axiosInstance;
