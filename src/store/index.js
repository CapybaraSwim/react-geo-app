import { configureStore } from '@reduxjs/toolkit';
import objectsReducer from './objectsSlice';

const store = configureStore({ reducer: { objects: objectsReducer } });

// Подписываемся на изменения и сохраняем в localStorage
store.subscribe(() => {
  localStorage.setItem('geo_objects', JSON.stringify(store.getState().objects));
});

export default store;