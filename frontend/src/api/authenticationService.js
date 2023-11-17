import { parseJwt } from "../helpers";
import { apiClient } from "./axios";

function authenticate(username, password) {
  return apiClient.post('/api/auth/signin', { username, password }, {
    headers: { 'Content-Type': 'application/json' }
  })
}

function signup(user) {
  return apiClient.post('/api/auth/signup', user, {
    headers: { 'Content-Type': 'application/json' }
  })
}

function getUser(user) {
  return apiClient.get('/api/users/self', {
    headers: { 'Authorization': bearerAuth(user)}
  })
}

function startChallenge(user) {
  return apiClient.post('/api/challenge', user, {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}

function getUserProfile(user) {
  return apiClient.get('/api/users/profile', {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function getCurrentChecklist(user) {
  return apiClient.get('/api/checklist/current', {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function submitCurrentChecklist(user, checklist, checklistId) {
  return apiClient.put(`/api/checklist/current/${checklistId}`, checklist, {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}

export const submitImage = async (user, checklistId, formData) => {
  try {
    apiClient.post(`/api/checklist/current/${checklistId}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': bearerAuth(user)
      }
    })
  } catch (error) {
    console.log(error)
  }
}


function bearerAuth(user) {
  return `Bearer ${user.accessToken}`
}
export const authApi = {
  authenticate,
  signup,
  startChallenge,
  getUserProfile,
  getUser,
  getCurrentChecklist,
  submitCurrentChecklist,
}

apiClient.interceptors.request.use(function (config) {
  if (config.headers.Authorization) {
    const token = config.headers.Authorization.split(' ')[1]
    const data = parseJwt(token)
    if (Date.now() > data.exp * 1000) {
      window.location.href = '/login'
    }
  }
  return config;
}, function (error) {
  return Promise.reject(error);
})