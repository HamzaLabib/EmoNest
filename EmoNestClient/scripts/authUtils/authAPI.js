import axios from 'axios';
const BASE_URL = 'https://imonest.onrender.com/api/auth';

export const loginUser = async (email, password) => {
  const res = await axios.post(`${BASE_URL}/login`, { email, password });
  return res.data;
};

export const registerUser = async (parentName, childName, age, email, password) => {
  const res = await axios.post(`${BASE_URL}/register`, { parentName, childName, age, email, password });
  return res.data;
};
