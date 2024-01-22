// store.js
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';

const store = configureStore({
  reducer: {
    category: categoryReducer,
    // Add other reducers if needed
  },
});

export default store;
