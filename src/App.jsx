import React, { useState } from 'react';
import MapComponent from './components/Map.jsx';
import ObjectForm from './components/ObjectForm.jsx';
import { fromLonLat, toLonLat } from 'ol/proj.js';

const App = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOk = (values) => {
    const lonlat = fromLonLat(values.coordinates); // Преобразование координат
    const newObject = {
      name: values.name,
      description: values.description,
      coordinates: lonlat,
    };
  
    // Обработка создания нового объекта (можно сохранить в localStorage)
    console.log('Создан новый объект:', newObject);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <MapComponent />
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <button onClick={() => setModalVisible(true)}>Добавить объект</button>
      </div>
      <ObjectForm visible={isModalVisible} onCreate={handleOk} onCancel={handleCancel} />
    </div>
  );
};

export default App;