import React, { useState } from 'react';
import { Modal, Input } from 'antd';

const ObjectForm = ({ onSubmit }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [lon, setLon] = useState('');
  const [lat, setLat] = useState('');

  const handleFormSubmit = () => {
    onSubmit({ name, lon, lat });
    setModalVisible(false);
    setName('');
    setLon('');
    setLat('');
  };

  return (
    <>
      <button onClick={() => setModalVisible(true)}>Добавить объект</button>
      <Modal
        title="Добавить новый объект"
        Modal open={modalVisible}
        onOk={handleFormSubmit}
        onCancel={() => setModalVisible(false)}
      >
        <Input
          placeholder="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Долгота"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
        />
        <Input
          placeholder="Широта"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default ObjectForm;