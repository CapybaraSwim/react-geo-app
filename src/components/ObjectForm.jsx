import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';

const ObjectForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onCreate(values);
    form.resetFields();
  };

  return (
    <Modal
      Modal open={visible}
      title="Добавить объект"
      okText="Создать"
      cancelText="Отмена"
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          label="Название"
          rules={[{ required: true, message: 'Пожалуйста, введите название объекта' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Описание"
          rules={[{ required: true, message: 'Пожалуйста, введите описание объекта' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ObjectForm;