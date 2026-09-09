import axios from 'axios';
import constants from '../constants';

const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
});

// Attach the stored JWT to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchArticles = () => API.get('/');
export const fetchArticleByName = (name) => API.get(`/${name}`);
export const createArticle = (article) => API.post('/', article);
export const updateArticle = (id, article) => API.put(`/${id}`, article);
export const toggleArticleStatus = (id) => API.patch(`/${id}/toggle`);
export const deleteArticle = (id) => API.delete(`/${id}`);