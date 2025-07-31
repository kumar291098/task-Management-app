// src/hooks/useTaskModal.js
import { useState } from 'react';

export const useTaskModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const openAddModal = () => {
    setEditingTask(null);
    setIsModalVisible(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setEditingTask(null);
    setIsModalVisible(false);
  };

  const isEditing = !!editingTask;

  return {
    isModalVisible,
    editingTask,
    isEditing,
    openAddModal,
    openEditModal,
    closeModal
  };
};