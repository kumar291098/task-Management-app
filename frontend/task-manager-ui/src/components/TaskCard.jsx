// src/components/TaskCard.jsx
import React from 'react';
import { Card, Tag, Button, Space } from 'antd';
import axios from 'axios';
const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'red';
    case 'normal':
      return 'blue';
    case 'low':
      return 'green';
    default:
      return 'default';
  }
};
const TaskCard = ({ task, onRefresh }) => {
  const deleteTask = async () => {
    await axios.delete(`http://localhost:5000/api/tasks/${task._id}`);
    onRefresh();
  };

  return (
    <Card title={task.title} extra={<Tag color={task.status === 'completed' ? 'green' : 'orange'}>{task.status}</Tag>}>
      <p>{task.description}</p>
      <Space>
        <Tag color={getPriorityColor(task.priority)}>Priority: {task.priority}</Tag>
        <Tag color="purple">Due: {new Date(task.dueDate).toLocaleDateString()}</Tag>
      </Space>
      <Button danger onClick={deleteTask}>Delete</Button>
    </Card>
  );
};

export default TaskCard;
