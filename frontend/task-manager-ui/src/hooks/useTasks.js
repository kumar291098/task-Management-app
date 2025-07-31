// src/hooks/useTasks.js
import { useState, useEffect } from 'react';
import { message } from 'antd';
import { taskService } from '../services/taskService';

export const useTasks = (userId = null) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const tasksData = await taskService.getAllTasks(userId);
      setTasks(tasksData);
    } catch (error) {
      message.error('Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      // Add userId to task data if provided
      if (userId) {
        taskData.userId = userId;
      }
      await taskService.createTask(taskData);
      message.success('Task created successfully!');
      fetchTasks();
    } catch (error) {
      message.error('Failed to create task');
      console.error('Error creating task:', error);
    }
  };

  const updateTask = async (taskId, taskData) => {
    try {
      await taskService.updateTask(taskId, taskData);
      message.success('Task updated successfully!');
      fetchTasks();
    } catch (error) {
      message.error('Failed to update task');
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      message.success('Task deleted successfully!');
      fetchTasks();
    } catch (error) {
      message.error('Failed to delete task');
      console.error('Error deleting task:', error);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      await taskService.updateTaskStatus(taskId, status);
      message.success(`Task marked as ${status}!`);
      fetchTasks();
    } catch (error) {
      message.error('Failed to update task status');
      console.error('Error updating task status:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return {
    tasks,
    pendingTasks,
    completedTasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    refreshTasks: fetchTasks
  };
};