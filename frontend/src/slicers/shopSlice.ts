import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { getAllProds, addProd, updateProd, deleteProd, getAllCategoriess } from '../APIs/shopAPI';
import { RootState } from '../app/store';
import { Category } from '../models/Category';
import { Product } from '../models/Product';

export interface ShopState {
  categories: Category[]
  products : Product[]
  selectedProduct: Product
}

const initialState: ShopState = {
  products: [],
  categories: [],
  selectedProduct: {id:-1,image:'', reviews:[],category:{desc:''},desc:'',price:0}
};

export const getProdsAsync = createAsyncThunk(
  'product/getAllProds',
  async () => {
    const response = await getAllProds();
    return response.data;
  }
);

export const getCategoriesAsync = createAsyncThunk(
  'product/getAllCategoriess',
  async () => {
    const response = await getAllCategoriess();
    return response.data;
  }
);

export const addProdAsync = createAsyncThunk(
  'product/addProd',
  async (newprod:Product) => {
    const response = await addProd(newprod);
    return response.data;
  }
);

export const updateProdAsync = createAsyncThunk(
  'product/updateProd',
  async (newprod:Product) => {
    const response = await updateProd(newprod);
    return response.data;
  }
);

export const deleteProdAsync = createAsyncThunk(
  'product/deleteProd',
  async (id:number) => {
    const response = await deleteProd(id);
    return response.data;
  }
);

export const shopSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    changeSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getProdsAsync.fulfilled, (state,action) => {
      state.products=action.payload
    })
    .addCase(getCategoriesAsync.fulfilled, (state,action) => {
      state.categories=action.payload
    })
    .addCase(addProdAsync.fulfilled, (state,action) => {
      state.products=action.payload
    })
    .addCase(deleteProdAsync.fulfilled, (state,action) => {
      state.products=action.payload
    })
    .addCase(updateProdAsync.fulfilled, (state,action) => {
      state.products=action.payload
    })

  },
});

export const { changeSelectedProduct } = shopSlice.actions;
export const selectProducts = (state: RootState) => state.shop.products;
export const selectSingleProduct = (state: RootState) => state.shop.selectedProduct;
export const selectCategories = (state: RootState) => state.shop.categories;
export default shopSlice.reducer;
