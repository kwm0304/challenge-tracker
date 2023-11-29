import axios from 'axios';

export const apiClient = axios.create(
  {
    baseURL: 'https://challenge-tracker-production.up.railway.app/'
    // baseURL: 'http://localhost:8080/'
  }
)
