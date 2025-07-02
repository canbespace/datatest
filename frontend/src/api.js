import axios from 'axios';

import Login from './pages/Login'; // or './components/Login'

<Route path="/login" element={<Login />} />


const API = axios.create({
  baseURL: '/api',
  withCredentials: true // if using cookies or sessions
});

export default API;
