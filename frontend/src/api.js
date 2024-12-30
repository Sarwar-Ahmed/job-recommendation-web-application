import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:8000/' });

export const fetchJobs = (pageNum) => API.get(`/jobs/?page=${pageNum + 1}`);
export const recommendJobs = (skills) => API.post('/job_recommend/', { skills });
export const logIn = (loginData) => API.post('/login/', {loginData});
export const userRegister = (userData) => API.post('/register/', {userData});