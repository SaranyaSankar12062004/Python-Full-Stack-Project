import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const getProducts = (search = '', category = '') =>
  API.get(`/products/?search=${search}&category=${category}`);

export const getProduct = (id) => API.get(`/products/${id}`);

export const registerUser = (data) => API.post('/users/register', data);

export const loginUser = (data) => API.post('/users/login', data);

export const createOrder = (data) => API.post('/orders/', data);

export const getMyOrders = () => API.get('/orders/my');