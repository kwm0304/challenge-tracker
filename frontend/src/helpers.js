export function parseJwt(token) {
  if (!token) { return }
  const baseURL = token.split('.')[1];
  const base64 = baseURL.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}
