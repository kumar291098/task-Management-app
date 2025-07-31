// src/components/Header.jsx
import React from 'react';
import { Layout, Button, Space, Avatar, Dropdown, Typography } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { userService } from '../services/userService';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = ({ currentUser, onLogout }) => {
  const handleLogout = () => {
    userService.logout();
    onLogout();
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <SettingOutlined />,
      label: 'Profile Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <AntHeader style={{ 
      background: '#fff', 
      padding: '0 24px', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <h2 style={{ margin: 0, color: '#1890ff' }}>
          📋 Task Management System
        </h2>
      </div>
      
      <Space>
        <Text>
          Welcome, <strong>{currentUser?.firstName} {currentUser?.lastName}</strong>
        </Text>
        
        {currentUser?.role === 'admin' && (
          <Text type="warning" strong>
            (Admin)
          </Text>
        )}
        
        <Dropdown 
          menu={{ items: userMenuItems }}
          placement="bottomRight"
        >
          <Button type="text" style={{ height: 'auto', padding: '4px 8px' }}>
            <Space>
              <Avatar 
                size="small" 
                icon={<UserOutlined />} 
                style={{ backgroundColor: '#1890ff' }}
              />
              {currentUser?.username}
            </Space>
          </Button>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default Header;