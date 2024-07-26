import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    deletedProducts: [],
    filteredProducts: [],
    filter: { brand: null, model: null },
    filterBrandOptions: [],
    filterModelOptions: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = state.products.filter(item => {
        return (
          (state.filter.brand === null || item.brand === state.filter.brand) &&
          (state.filter.model === null || item.model === state.filter.model)
        );
      });
      state.filterBrandOptions = state.filteredProducts
        .map(item => item.brand)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort();
      state.filterModelOptions = state.filteredProducts
        .map(item => item.model)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort();
    },

    setDeletedProducts: (state, action) => {
      state.deletedProducts = action.payload;
    },

    setFilter: (state, action) => {
      const { type, value } = action.payload;
      state.filter[type] = value;
      state.filteredProducts = state.products.filter(item => {
        return (
          (state.filter.brand === null || item.brand === state.filter.brand) &&
          (state.filter.model === null || item.model === state.filter.model)
        );
      });
      state.filterBrandOptions = state.filteredProducts
        .map(item => item.brand)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort();
      state.filterModelOptions = state.filteredProducts
        .map(item => item.model)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort();
    },

    updateProduct: (state, action) => {
      const { id, updates } = action.payload;
      state.products = state.products.map(product =>
        product.id === id ? { ...product, ...updates } : product
      );
      state.filteredProducts = state.products.filter(item => {
        return (
          (state.filter.brand === null || item.brand === state.filter.brand) &&
          (state.filter.model === null || item.model === state.filter.model)
        );
      });
    },

    deleteProduct: (state, action) => {
      const { id } = action.payload;
      state.products = state.products.filter(product => product.id !== id);
      state.filteredProducts = state.products.filter(item => {
        return (
          (state.filter.brand === null || item.brand === state.filter.brand) &&
          (state.filter.model === null || item.model === state.filter.model)
        );
      });
    },

  },


});

export const { setProducts, setDeletedProducts, setFilter, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
