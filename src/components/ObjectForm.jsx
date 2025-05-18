import React from 'react';
import { Modal, Form, Input } from 'antd';

const ObjectForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={visible}
      title="Добавить объект"
      okText="Создать"
      cancelText="Отмена"
      onCancel={onCancel}
      onOk={() => {
        form.validateFields()
          .then(values => {
            form.resetFields();
            onCreate({
              name: values.name,
              description: values.description,
              coordinates: [ parseFloat(values.lon), parseFloat(values.lat) ],
            });
          });
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Название" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Описание">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="lon" label="Долгота" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="lat" label="Широта" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ObjectForm;