import axios from 'axios';
import { LOCAL_URL } from '@env';
console.log(' URL:', LOCAL_URL);

export const loginUser = async (email, password) => {
  const res = await axios.post(`${LOCAL_URL}/login`, { email, password });
  return res.data;
};

export const registerUser = async (parentName, childName, age, email, password) => {
  const res = await axios.post(`${LOCAL_URL}/register`, { parentName, childName, age, email, password });
  return res.data;
};
