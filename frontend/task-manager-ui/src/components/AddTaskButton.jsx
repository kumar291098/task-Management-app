// src/components/AddTaskButton.jsx
import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const AddTaskButton = ({ onClick }) => {
  return (
    <div style={{ marginBottom: '24px', textAlign: 'center' }}>
      <Button 
        type="primary" 
        size="large"
        icon={<PlusOutlined />} 
        onClick={onClick}
      >
        Add New Task
      </Button>
    </div>
  );
};

export default AddTaskButton;