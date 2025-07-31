// src/pages/TaskPage.jsx
import React from 'react';
import { Row, Col } from 'antd';
import { useTasks } from '../hooks/useTasks';
import { useTaskModal } from '../hooks/useTaskModal';
import AddTaskButton from '../components/AddTaskButton';
import TaskColumn from '../components/TaskColumn';
import TaskModal from '../components/TaskModal';

const TaskPage = () => {
  const {
    pendingTasks,
    completedTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus
  } = useTasks();

  const {
    isModalVisible,
    editingTask,
    openAddModal,
    openEditModal,
    closeModal
  } = useTaskModal();

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
            onEdit={openEditModal}
            onDelete={deleteTask}
            onStatusChange={updateTaskStatus}
          />
        </Col>
      </Row>

      <TaskModal
        isVisible={isModalVisible}
        editingTask={editingTask}
        onClose={closeModal}
        onTaskCreated={handleTaskCreated}
        onTaskUpdated={handleTaskUpdated}
      />
    </div>
  );
};

export default TaskPage;
