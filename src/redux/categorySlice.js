// categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an async thunk for fetching categories
export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
  const response = await axios.get('http://localhost:8000/admin/categories');
  return response.data;
});

// Define an async thunk for adding a category
export const addCategory = createAsyncThunk('category/addCategory', async (categoryName) => {
  const response = await axios.post('http://localhost:8000/admin/categories', { categoryName });
  return response.data;
});

// Define an async thunk for deleting a category by ID
export const deleteCategory = createAsyncThunk('category/deleteCategory', async (categoryId) => {
  await axios.delete(`http://localhost:8000/admin/delete/${categoryId}`);
  return categoryId;
});

// Define an async thunk for updating a category by ID
export const updateCategory = createAsyncThunk('category/updateCategory', async ({ categoryId, categoryName }) => {
  const response = await axios.put(`http://localhost:8000/admin/update/${categoryId}`, { categoryName });
  return response.data;
});

// Create the category slice
const categorySlice = createSlice({
  name: 'category',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.list = state.list.filter((category) => category._id !== action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.list = state.list.map((category) =>
          category._id === action.payload._id ? action.payload : category
        );
      });
  },
});

export default categorySlice.reducer;

