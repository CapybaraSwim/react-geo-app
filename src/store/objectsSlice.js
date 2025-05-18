import { createSlice } from '@reduxjs/toolkit';

// Попытка загрузить из localStorage
const saved = localStorage.getItem('geo_objects');
const initialState = saved ? JSON.parse(saved) : [
  { id: 1, name: 'ЮФУ Библиотека', description: '', coordinates: [39.699196,47.233797] },
  { id: 2, name: 'ТЦ Плаза',        description: '', coordinates: [39.631649,47.208845] },
];

let nextId = initialState.length + 1;

const slice = createSlice({
  name: 'objects',
  initialState,
  reducers: {
    addObject(state, action) {
      state.push({ id: nextId++, ...action.payload });
    },
  },
});

export const { addObject } = slice.actions;

export default slice.reducer;