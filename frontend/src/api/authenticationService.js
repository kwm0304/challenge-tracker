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


function bearerAuth(user) {
  return `Bearer ${user.accessToken}`
}
export const authApi = {
  authenticate,
  signup,
  startChallenge,
  getUserProfile,
  getUser
}