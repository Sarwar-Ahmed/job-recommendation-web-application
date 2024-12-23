import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:8000/' });

export const fetchJobs = () => API.get('/jobs/');
export const recommendJobs = (skills) => API.post('/job_recommend/', { skills });