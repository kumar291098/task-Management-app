// src/components/TaskForm.jsx
import React from 'react';
import { Form, Input, Button, Select, DatePicker, Card } from 'antd';
import axios from 'axios';

const { Option } = Select;

const TaskForm = ({ onTaskCreated }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    values.dueDate = values.dueDate.toISOString();
    await axios.post('http://localhost:5000/api/tasks', values);
    form.resetFields();
    onTaskCreated();
  };

  return (
    <Card title="Create New Task" style={{ marginBottom: 24 }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="status" label="Status" initialValue="pending">
          <Select>
            <Option value="pending">Pending</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </Form.Item>
        <Form.Item name="priority" label="Priority" initialValue="normal">
          <Select>
            <Option value="low">Low</Option>
            <Option value="normal">Normal</Option>
            <Option value="high">High</Option>
          </Select>
        </Form.Item>
        <Form.Item name="dueDate" label="Due Date" rules={[{ required: true }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Add Task</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TaskForm;
