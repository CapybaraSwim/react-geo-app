import React, { useState, useEffect } from 'react';
import Map from './components/Map.jsx';
import ObjectForm from './components/ObjectForm.jsx';

const App = () => {
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    const storedObjects = JSON.parse(localStorage.getItem('objects'));
    if (storedObjects) {
      setObjects(storedObjects);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('objects', JSON.stringify(objects));
  }, [objects]);

  const handleObjectSubmit = (newObject) => {
    setObjects([...objects, newObject]);
  };

  return (
    <div>
      <Map objects={objects} />
      <ObjectForm onSubmit={handleObjectSubmit} />
    </div>
  );
};

export default App;