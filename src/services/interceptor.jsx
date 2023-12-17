import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://localhost:5110/api',
});
apiService.interceptors.request.use(
    (config) => {
      console.log('Request interceptor:', config);
      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );
  
  apiService.interceptors.response.use(
    (response) => {
      console.log('Response interceptor:', response);
      return response;
    },
    (error) => {
      console.error('Response interceptor error:', error);
      return Promise.reject(error);
    }
  );
  