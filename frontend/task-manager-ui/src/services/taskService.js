// src/services/taskService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/tasks';

export const taskService = {
  // Get all tasks
  getAllTasks: async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },

  // Create a new task
  createTask: async (taskData) => {
    const response = await axios.post(API_BASE_URL, taskData);
    return response.data;
  },

  // Update a task
  updateTask: async (taskId, taskData) => {
    const response = await axios.put(`${API_BASE_URL}/${taskId}`, taskData);
    return response.data;
  },

  // Delete a task
  deleteTask: async (taskId) => {
    const response = await axios.delete(`${API_BASE_URL}/${taskId}`);
    return response.data;
  },

  // Update task status only
  updateTaskStatus: async (taskId, status) => {
    const response = await axios.put(`${API_BASE_URL}/${taskId}`, { status });
    return response.data;
  }
};