// src/components/UserSelector.jsx
import React, { useState, useEffect } from 'react';
import { Select, Button, Space, Typography } from 'antd';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import { userService } from '../services/userService';

const { Option } = Select;
const { Title } = Typography;

const UserSelector = ({ currentUserId, onUserChange, onViewAll, currentUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log('UserSelector rendered with currentUser:', currentUser);

  useEffect(() => {
    console.log('UserSelector useEffect triggered, currentUser:', currentUser);
    if (currentUser?.role === 'admin') {
      console.log('User is admin, fetching users...');
      fetchUsers();
    } else {
      console.log('User is not admin, role:', currentUser?.role);
    }
  }, [currentUser]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log('Starting fetchUsers...');
      const usersData = await userService.getAllUsers();
      console.log('Users fetched successfully:', usersData);
      console.log('Users array length:', usersData?.length);
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      console.error('Error response:', error.response);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  console.log('Current users state:', users);
  console.log('Users array length in state:', users.length);

  // Only show user selector for admin users
  if (currentUser?.role !== 'admin') {
    console.log('Not showing UserSelector - user role is:', currentUser?.role);
    return null;
  }

  console.log('Showing UserSelector for admin user');

  return (
    <div style={{ 
      marginBottom: '24px', 
      padding: '16px', 
      backgroundColor: '#f5f5f5', 
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <Title level={4} style={{ marginBottom: '16px' }}>
        <UserOutlined /> Admin Task Management
      </Title>
      
      <Space size="large">
        <Button 
          type={!currentUserId ? "primary" : "default"}
          icon={<TeamOutlined />}
          onClick={onViewAll}
        >
          View All Tasks
        </Button>
        
        <Select
          placeholder="Select a user"
          style={{ width: 250 }}
          value={currentUserId}
          onChange={onUserChange}
          loading={loading}
          allowClear
        >
          {users.map(user => (
            <Option key={user.id} value={user.id}>
              {user.firstName} {user.lastName} (@{user.username})
            </Option>
          ))}
        </Select>
      </Space>
      
      {currentUserId && (
        <div style={{ marginTop: '8px', color: '#666' }}>
          Viewing tasks for: <strong>{users.find(u => u.id === currentUserId)?.firstName} {users.find(u => u.id === currentUserId)?.lastName}</strong>
        </div>
      )}
      
      {!currentUserId && (
        <div style={{ marginTop: '8px', color: '#666' }}>
          Viewing all tasks from all users
        </div>
      )}
    </div>
  );
};

export default UserSelector;