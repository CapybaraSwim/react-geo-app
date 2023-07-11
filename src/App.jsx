import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import Map from './components/Map.jsx';
import ObjectForm from './components/ObjectForm.jsx';

const App = () => {
  const [objects, setObjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Загрузка объектов из localStorage при загрузке страницы
    const localStorageObjects = localStorage.getItem('objects');
    if (localStorageObjects) {
      setObjects(JSON.parse(localStorageObjects));
    }
  }, []);

  useEffect(() => {
    // Сохранение объектов в localStorage
    localStorage.setItem('objects', JSON.stringify(objects));
  }, [objects]);

  const handleAddObject = (newObject) => {
    setObjects([...objects, newObject]);
    setShowModal(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setShowModal(true)}
        style={{ marginBottom: '16px' }}
      >
        Добавить объект
      </Button>
      <Map objects={objects} />
      <Modal
        title="Добавить объект"
        Modal open={modalVisible}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <ObjectForm onAddObject={handleAddObject} />
      </Modal>
    </div>
  );
};

export default App;