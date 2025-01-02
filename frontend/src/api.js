import axios from 'axios';

const axiosAPI = axios.create({ baseURL: 'http://127.0.0.1:8000/' });

export const fetchJobs = (pageNum) => axiosAPI.get(`/jobs/?page=${pageNum + 1}`);
export const recommendJobs = (skills) => axiosAPI.post('/job_recommend/', { skills });
export const logIn = (loginData) => axiosAPI.post('/login/', {loginData});
export const userRegister = (userData) => axiosAPI.post('/register/', {userData});
export const profile = (user) => axiosAPI.post('/profile/', {user});

axiosAPI.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access_token');  // Get the token from localStorage
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;  // Attach token to headers
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Handle token expiry, log out, or redirect on 401 errors globally
axiosAPI.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Handle Unauthorized error (maybe log out or refresh token)
        console.log('Session expired or unauthorized');
        // Clear local storage and redirect to login
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
  
  export default axiosAPI;
  