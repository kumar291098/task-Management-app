// src/services/userService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/users';

// Set up axios interceptor to include auth token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const userService = {
  // Register new user
  register: async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Get user profile
  getProfile: async () => {
    const response = await axios.get(`${API_BASE_URL}/profile`);
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await axios.put(`${API_BASE_URL}/profile`, userData);
    localStorage.setItem('currentUser', JSON.stringify(response.data.user));
    return response.data;
  },

  // Get all users (admin only)
  getAllUsers: async () => {
    console.log('userService.getAllUsers called');
    console.log('Making request to:', API_BASE_URL);
    const response = await axios.get(API_BASE_URL);
    console.log('Response received:', response);
    console.log('Response data:', response.data);
    return response.data;
  },

  // Delete user (admin only)
  deleteUser: async (userId) => {
    const response = await axios.delete(`${API_BASE_URL}/${userId}`);
    return response.data;
  }
};