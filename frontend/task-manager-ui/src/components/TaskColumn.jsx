// src/components/TaskColumn.jsx
import React from 'react';
import { Typography } from 'antd';
import TaskCard from './TaskCard';
import { dragDropUtils } from '../utils/dragDropUtils';

const { Title } = Typography;

const TaskColumn = ({ 
  title, 
  tasks, 
  status, 
  backgroundColor, 
  borderColor, 
  onEdit, 
  onDelete, 
  onStatusChange 
}) => {
  const handleDrop = (e) => {
    dragDropUtils.onDrop(e, status, onStatusChange);
  };

  const emptyMessage = status === 'pending' 
    ? 'No pending tasks. Drop tasks here to mark as pending.'
    : 'No completed tasks. Drop tasks here to mark as completed.';

  return (
    <div 
      style={{ 
        minHeight: '500px', 
        padding: '16px', 
        backgroundColor, 
        borderRadius: '8px',
        border: `2px dashed ${borderColor}`
      }}
      onDragOver={dragDropUtils.onDragOver}
      onDrop={handleDrop}
    >
      <Title level={3} style={{ textAlign: 'center', marginBottom: '24px' }}>
        {title} ({tasks.length})
      </Title>
      
      {tasks.map(task => (
        <div key={task._id} style={{ marginBottom: '16px' }}>
          <TaskCard 
            task={task} 
            onEdit={onEdit}
            onDelete={onDelete}
            onDragStart={dragDropUtils.onDragStart}
            draggable
          />
        </div>
      ))}
      
      {tasks.length === 0 && (
        <div style={{ textAlign: 'center', color: '#999', marginTop: '50px' }}>
          {emptyMessage}
        </div>
      )}
    </div>
  );
};

export default TaskColumn;