import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/test/';


export const getPublicContent = () => {
    return axios.get(API_URL + 'all');
  }

export const getUserContent = ()  => {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

export const getModContent = () => {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

export const getAdminContent = () => {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
