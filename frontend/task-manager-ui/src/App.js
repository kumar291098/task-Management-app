// src/App.js
import React from 'react';
import { Layout, Typography } from 'antd';
import TaskPage from './pages/TaskPage';

const { Header, Content } = Layout;
const { Title } = Typography;

const App = () => {
  return (
    <Layout>
      <Header style={{ backgroundColor: '#001529' }}>
        <Title style={{ color: '#fff', margin: 0 }} level={3}>Task Manager</Title>
      </Header>
      <Content style={{ padding: '20px' }}>
        <TaskPage />
      </Content>
    </Layout>
  );
};

export default App;
