// src/App.js
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import TaskPage from './pages/TaskPage';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import { userService } from './services/userService';

const { Content } = Layout;

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const user = userService.getCurrentUser();
    if (user && userService.isAuthenticated()) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  if (!currentUser) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header currentUser={currentUser} onLogout={handleLogout} />
      <Content style={{ padding: '0' }}>
        <TaskPage currentUser={currentUser} />
      </Content>
    </Layout>
  );
};

export default App;
