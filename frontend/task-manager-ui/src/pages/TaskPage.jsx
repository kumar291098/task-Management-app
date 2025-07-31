
// src/pages/TaskPage.jsx
import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { useTasks } from '../hooks/useTasks';
import { useTaskModal } from '../hooks/useTaskModal';
import AddTaskButton from '../components/AddTaskButton';
import TaskColumn from '../components/TaskColumn';
import TaskModal from '../components/TaskModal';
import UserSelector from '../components/UserSelector';

const TaskPage = ({ currentUser }) => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  
  // For admin: use selectedUserId, for regular users: use their own ID
  const effectiveUserId = currentUser?.role === 'admin' ? selectedUserId : currentUser?.id;
  
  const {
    pendingTasks,
    completedTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus
  } = useTasks(effectiveUserId);

  const {
    isModalVisible,
    editingTask,
    openAddModal,
    openEditModal,
    closeModal
  } = useTaskModal();

  const handleUserChange = (userId) => {
    setSelectedUserId(userId);
  };

  const handleViewAll = () => {
    setSelectedUserId(null);
  };

  const handleTaskCreated = () => {
    closeModal();
    // Task list will be refreshed automatically by useTasks hook
  };

  const handleTaskUpdated = () => {
    closeModal();
    // Task list will be refreshed automatically by useTasks hook
  };

  return (
    <div style={{ padding: '24px' }}>
      <UserSelector 
        currentUserId={selectedUserId}
        onUserChange={handleUserChange}
        onViewAll={handleViewAll}
        currentUser={currentUser}
      />
      
      <AddTaskButton onClick={openAddModal} />

      <Row gutter={[24, 24]}>
        <Col span={12}>
          <TaskColumn
            title="Pending Tasks"
            tasks={pendingTasks}
            status="pending"
            backgroundColor="#f5f5f5"
            borderColor="#d9d9d9"
            onEdit={openEditModal}
            onDelete={deleteTask}
            onStatusChange={updateTaskStatus}
          />
        </Col>

        <Col span={12}>
          <TaskColumn
            title="Completed Tasks"
            tasks={completedTasks}
            status="completed"
            backgroundColor="#f6ffed"
            borderColor="#b7eb8f"
            onStatusChange={updateTaskStatus}
            onEdit={openEditModal}
            onDelete={deleteTask}
          />
        </Col>
      </Row>

      <TaskModal
        isVisible={isModalVisible}
        editingTask={editingTask}
        onClose={closeModal}
        onTaskCreated={handleTaskCreated}
        onTaskUpdated={handleTaskUpdated}
        currentUserId={effectiveUserId}
      />
    </div>
  );
};

export default TaskPage;
