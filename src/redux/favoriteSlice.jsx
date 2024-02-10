// favoriteSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load favorites from local storage
const initialState = JSON.parse(localStorage.getItem('favorites')) || [];

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites(state, action) {
      state.push(action.payload);
      localStorage.setItem('favorites', JSON.stringify(state));
    },
    removeFromFavorites(state, action) {
      const updatedState = state.filter((item) => item.id !== action.payload.id);
      localStorage.setItem('favorites', JSON.stringify(updatedState));
      return updatedState;
    },
    updateFavorites(state, action) {
      localStorage.setItem('favorites', JSON.stringify(action.payload));
      return action.payload;
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  updateFavorites,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
