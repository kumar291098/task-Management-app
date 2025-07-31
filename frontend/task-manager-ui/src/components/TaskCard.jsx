// src/components/TaskCard.jsx
import React, { useState } from 'react';
import { Card, Tag, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined, DragOutlined } from '@ant-design/icons';

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

const TaskCard = ({ task, onEdit, onDelete, onDragStart, draggable }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    onDelete(task.taskId);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    onDragStart(e, task);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <Card 
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {draggable && <DragOutlined style={{ color: '#999', cursor: 'grab' }} />}
          {task.title}
        </div>
      }
      extra={<Tag color={task.status === 'completed' ? 'green' : 'orange'}>{task.status}</Tag>}
      style={{ 
        marginBottom: 16,
        cursor: draggable ? 'grab' : 'default',
        opacity: isDragging ? 0.5 : 1,
        transition: 'opacity 0.2s',
        border: isDragging ? '2px dashed #1890ff' : '1px solid #d9d9d9'
      }}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <p>{task.description}</p>
      <Space style={{ marginBottom: 16 }}>
        <Tag color={getPriorityColor(task.priority)}>Priority: {task.priority}</Tag>
        <Tag color="purple">Due: {new Date(task.dueDate).toLocaleDateString()}</Tag>
      </Space>
      <Space>
        <Button 
          type="primary" 
          icon={<EditOutlined />} 
          onClick={handleEdit}
          size="small"
        >
          Edit
        </Button>
        <Button 
          danger 
          icon={<DeleteOutlined />} 
          onClick={handleDelete}
          size="small"
        >
          Delete
        </Button>
      </Space>
      {draggable && (
        <div style={{ 
          marginTop: '8px', 
          fontSize: '12px', 
          color: '#999', 
          textAlign: 'center' 
        }}>
          Drag to change status
        </div>
      )}
    </Card>
  );
};

export default TaskCard;
