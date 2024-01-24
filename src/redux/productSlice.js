// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an async thunk for fetching products
export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const response = await axios.get('http://localhost:8000/admin/product');
  return response.data;
});

// Define an async thunk for adding a product
export const addProduct = createAsyncThunk('product/addProduct', async ({ categoryName, productName ,price}) => {
    console.log("slice", categoryName, productName)
    const response = await axios.post('http://localhost:8000/admin/product', { categoryName, productName,price });
    return response.data;
  });
  

// Define an async thunk for deleting a product by ID
export const deleteProduct = createAsyncThunk('product/deleteProduct', async (productId) => {
  await axios.delete(`http://localhost:8000/admin/productDelete/${productId}`);
  return productId;
});

// Define an async thunk for updating a product by ID
export const updateProduct = createAsyncThunk('product/updateProduct', async ({ productId, productName ,categoryName,price}) => {
  const response = await axios.put(`http://localhost:8000/admin/productUpdate/${productId}`, { productName,categoryName,price });
  return response.data;
});

// Create the product slice
const productSlice = createSlice({
  name: 'product',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter((product) => product._id !== action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.list = state.list.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
      });
  },
});

export default productSlice.reducer;
