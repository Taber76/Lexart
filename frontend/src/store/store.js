import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import productsSlice from './productsSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    products: productsSlice
  }
})

export default store