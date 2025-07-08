
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://datatest-b2k5.onrender.com',
  withCredentials: true // if using cookies or sessions
});

export default API;
