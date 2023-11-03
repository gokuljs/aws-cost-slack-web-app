import axios, { AxiosHeaders } from 'axios';
import { env } from '../constants/enviroments';
import authApis from '../apis/auth';
import store from '../store';

const defaultHeaders = new AxiosHeaders();
defaultHeaders.set('Content-Type', 'application/json');
defaultHeaders.set('X-Requested-With', 'XMLHttpRequest');

const Api = axios.create({
  baseURL: env.VITE_APP_BASE_URL,
  headers: defaultHeaders,
  responseType: 'json',
  withCredentials: true,
});

Api.interceptors.request.use((config) => {
  let token = store.getState().user.token;
  if (!token && env.DEV) {
    token = env.VITE_APP_USER_TOKEN;
  }
  if (token) {
    config.headers.set('token', token);
  }
  return config;
});

Api.interceptors.response.use((response) => {
  if (response.status === 401) {
    authApis.logout();
  }
  return response;
});

export default Api;
