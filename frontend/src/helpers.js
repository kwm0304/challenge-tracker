export function parseJwt(token) {
  if (!token) { return }
  const baseURL = token.split('.')[1];
  const base64 = baseURL.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export const isValidPassword = (password, verifyPassword) => {
  if (password === '' && verifyPassword === '') {
    return true
  }
  if (password.length < 8 || password.length > 20 ||
    password !== verifyPassword) {
    return false
  }
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  return hasUppercase && hasLowercase;
}
