import axios from 'axios';
const BASE_URL = 'https://imonest.onrender.com/api/auth';

export const loginUser = async (email, password) => {
  const res = await axios.post(`${BASE_URL}/login`, { email, password });
  return res.data;
};

export const registerUser = async (email, password) => {
  const res = await axios.post(`${BASE_URL}/register`, { email, password });
  return res.data;
};
