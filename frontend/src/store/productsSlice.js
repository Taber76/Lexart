import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    filteredProducts: [],
    filter: [], // [{brand: 'Samsung'}, {model: 'Galaxy'}]
    filterBrandOptions: [],
    filterModelOptions: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload.filter(item => {
        return state.filter.every(f => {
          return (
            (f.brand === undefined || item.brand === f.brand) &&
            (f.model === undefined || item.model === f.model)
          );
        });
      })
      state.filterBrandOptions = state.products
        .map(item => item.brand)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort();

      state.filterModelOptions = state.products
        .map(item => item.model)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort();
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      if (action.payload.length === 0) {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(item => {
          return action.payload.every(f => {
            return (
              (f.brand === undefined || item.brand === f.brand) &&
              (f.model === undefined || item.model === f.model)
            );
          });
        });
      }
    },
    updateProduct: (state, action) => {
      const { id, updates } = action.payload;
      state.products = state.products.map(product =>
        product.id === id ? { ...product, ...updates } : product
      );
      state.filteredProducts = state.products.filter(item => {
        return state.filter.every(f => {
          return (
            (f.brand === undefined || item.brand === f.brand) &&
            (f.model === undefined || item.model === f.model)
          );
        });
      });
    },
    deleteProduct: (state, action) => {
      const { id } = action.payload;
      state.products = state.products.filter(product => product.id !== id);
      state.filteredProducts = state.products.filter(item => {
        return state.filter.every(f => {
          return (
            (f.brand === undefined || item.brand === f.brand) &&
            (f.model === undefined || item.model === f.model)
          );
        });
      });
    },
  },
});

export const { setProducts, setFilter, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
