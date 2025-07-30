// src/pages/TaskPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'antd';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <TaskForm onTaskCreated={fetchTasks} />
      <Row gutter={[16, 16]}>
        {tasks.map(task => (
          <Col key={task._id} span={8}>
            <TaskCard task={task} onRefresh={fetchTasks} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default TaskPage;
