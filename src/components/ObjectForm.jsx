import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const ObjectForm = ({ onAddObject }) => {
  const [name, setName] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newObject = {
      name: name,
      lat: parseFloat(lat),
      lon: parseFloat(lon)
    };

    onAddObject(newObject);
    setName('');
    setLat('');
    setLon('');
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Название">
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Item>
      <Form.Item label="Широта">
        <Input value={lat} type="number" onChange={(e) => setLat(e.target.value)} />
      </Form.Item>
      <Form.Item label="Долгота">
        <Input value={lon} type="number" onChange={(e) => setLon(e.target.value)} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ObjectForm;