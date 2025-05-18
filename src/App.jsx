import React, { useState } from 'react';
import { useDispatch }      from 'react-redux';
import { Button }           from 'antd';

import MapComponent from './components/Map';
import ObjectForm   from './components/ObjectForm';
import { addObject } from './store/objectsSlice';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleCreate = obj => {
    dispatch(addObject(obj));
    setModalVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        style={{ position: 'absolute', top: 16, right: 16, zIndex: 1000 }}
        onClick={() => setModalVisible(true)}
      >
        Добавить объект
      </Button>

      <MapComponent />

      <ObjectForm
        visible={modalVisible}
        onCreate={handleCreate}
        onCancel={() => setModalVisible(false)}
      />
    </>
  );
};

export default App;
