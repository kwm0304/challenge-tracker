import axios from 'axios';
const API_URL = 'http://localhost:8080/api/auth/';

export const login = (username, password) => {
    return axios.post('http://localhost:8080/api/auth/signin', {
      username,
      password
      }, {
        headers: {'Content-Type': 'application/json',
        withCredentials: true
      },
      })
      
  }

export const logout = () => {
    localStorage.removeItem('user');
  }

export const register = (username, email, password)  => {
    return axios.post(API_URL + 'signup', {
      username,
      email,
      password
      }, {
        headers: {
          'Content-Type': 'application/json',
          withCredentials: true
        } 
      });
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
