// store.js
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import productReducer from "./productSlice"
const store = configureStore({
  reducer: {
    category: categoryReducer,
    product:productReducer,
    // Add other reducers if needed
  },
});

export default store;
