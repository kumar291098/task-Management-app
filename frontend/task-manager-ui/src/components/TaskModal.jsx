  // src/components/TaskModal.jsx
import React from 'react';
import { Modal } from 'antd';
import TaskForm from './TaskForm';

const TaskModal = ({ 
  isVisible, 
  editingTask, 
  onClose, 
  onTaskCreated, 
  onTaskUpdated,
  currentUserId 
}) => {
  const isEditing = !!editingTask;
  const title = isEditing ? "Edit Task" : "Add New Task";

  return (
    <Modal
      title={title}
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <TaskForm 
        onTaskCreated={onTaskCreated} 
        editingTask={editingTask}
        onTaskUpdated={onTaskUpdated}
        onCancelEdit={onClose}
        isModal={true}
        currentUserId={currentUserId}
      />
    </Modal>
  );
};

export default TaskModal;