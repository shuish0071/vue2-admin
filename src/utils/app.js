import cookie from "cookie_js";

const admin_token = "admin_token";
const username = "username";

export function getToken() {
  return cookie.get(admin_token);
}

export function setToken(token) {
  return cookie.set(admin_token, token);
}

export function removeToken() {
  return cookie.remove(admin_token);
}

export function setUsername(value) {
  return cookie.set(username, value);
}

export function getUsername() {
  return cookie.get(username);
}

export function removeUsername() {
  return cookie.remove(username);
}
