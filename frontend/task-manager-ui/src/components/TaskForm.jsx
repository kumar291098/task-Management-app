// src/components/TaskForm.jsx
import React, { useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, Card, message } from 'antd';
import dayjs from 'dayjs';
import { taskService } from '../services/taskService';

const { Option } = Select;

const TaskForm = ({ onTaskCreated, editingTask, onTaskUpdated, onCancelEdit, isModal }) => {
  const [form] = Form.useForm();
  const isEditing = !!editingTask;

  useEffect(() => {
    if (editingTask) {
      form.setFieldsValue({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
        priority: editingTask.priority,
        dueDate: dayjs(editingTask.dueDate)
      });
    } else {
      form.resetFields();
    }
  }, [editingTask, form]);

  const onFinish = async (values) => {
    try {
      values.dueDate = values.dueDate.toISOString();
      
      if (isEditing) {
        await taskService.updateTask(editingTask.taskId, values);
        message.success('Task updated successfully!');
        onTaskUpdated();
      } else {
        await taskService.createTask(values);
        message.success('Task created successfully!');
        form.resetFields();
        onTaskCreated();
      }
    } catch (error) {
      message.error(`Failed to ${isEditing ? 'update' : 'create'} task`);
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  const formContent = (
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
        <Button type="primary" htmlType="submit">
          {isEditing ? 'Update Task' : 'Add Task'}
        </Button>
        {isEditing && isModal && (
          <Button style={{ marginLeft: 8 }} onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </Form.Item>
    </Form>
  );

  if (isModal) {
    return formContent;
  }

  return (
    <Card title={isEditing ? "Edit Task" : "Create New Task"} style={{ marginBottom: 24 }}>
      {formContent}
    </Card>
  );
};

export default TaskForm;
