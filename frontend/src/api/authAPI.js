// ============================================
//  Auth API — Signup & Login
// ============================================
import API from "./axios";

/**
 * Register a new user
 * POST /api/auth/signup
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {{ message: string }}
 */
export const signup = async (name, email, password) => {
  const res = await API.post("/auth/signup", { name, email, password });
  return res.data;
};

/**
 * Login an existing user
 * POST /api/auth/login
 * @param {string} email
 * @param {string} password
 * @returns {{ message: string, token: string }}
 */
export const login = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });
  return res.data;
};

/**
 * Save JWT token to localStorage
 * @param {string} token
 */
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

/**
 * Remove JWT token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem("token");
};

/**
 * Get JWT token from localStorage
 * @returns {string|null}
 */
export const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
