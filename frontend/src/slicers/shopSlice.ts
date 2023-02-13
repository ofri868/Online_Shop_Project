import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { getProds, addProd, updateProd, deleteProd, getCategories, getReviews, addReview } from '../APIs/shopAPI';
import { RootState } from '../app/store';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { Review } from '../models/Review';

export interface ShopState {
  categories: Category[]
  products: Product[]
  selectedProduct: Product
  reviews: Review[]
  message: string
}

const initialState: ShopState = {
  products: [],
  categories: [],
  selectedProduct: { id: -1, image: '', category: { desc: '' }, desc: '', price: 0 },
  reviews: [],
  message: ''
};

export const getProdsAsync = createAsyncThunk(
  'product/getProds',
  async () => {
    const response = await getProds();
    return response.data;
  }
);

export const getCategoriesAsync = createAsyncThunk(
  'product/getCategoriess',
  async () => {
    const response = await getCategories();
    return response.data;
  }
);

export const addProdAsync = createAsyncThunk(
  'product/addProd',
  async (newprod: Product) => {
    const response = await addProd(newprod);
    return response.data;
  }
);

export const updateProdAsync = createAsyncThunk(
  'product/updateProd',
  async (newprod: Product) => {
    const response = await updateProd(newprod);
    return response.data;
  }
);

export const deleteProdAsync = createAsyncThunk(
  'product/deleteProd',
  async (id: number) => {
    const response = await deleteProd(id);
    return response.data;
  }
);

export const getReviewsAsync = createAsyncThunk(
  'product/getReviews',
  async (product: number) => {
    const response = await getReviews(product);
    return response.data;
  }
);

export const addReviewAsync = createAsyncThunk(
  'product/addReview',
  async (data: { newReview: Review, myToken: string }) => {
    const response = await addReview(data.newReview, data.myToken);
    return response.data;
  }
);

export const shopSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    changeSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
      localStorage.setItem('selectedProduct', JSON.stringify(action.payload))
    },
    loadSelectedProduct: (state) => {
      state.selectedProduct = JSON.parse(localStorage.getItem('selectedProduct') || '{}')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProdsAsync.fulfilled, (state, action) => {
        state.products = action.payload
      })
      .addCase(getCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(addProdAsync.fulfilled, (state, action) => {
        state.products = action.payload
      })
      .addCase(deleteProdAsync.fulfilled, (state, action) => {
        state.products = action.payload
      })
      .addCase(updateProdAsync.fulfilled, (state, action) => {
        state.products = action.payload
      })
      .addCase(getReviewsAsync.fulfilled, (state, action) => {
        state.reviews = action.payload
      })
      .addCase(addReviewAsync.fulfilled, (state, action) => {
        state.message = action.payload
      })
  },
});

export const { loadSelectedProduct, changeSelectedProduct } = shopSlice.actions;
export const selectProducts = (state: RootState) => state.shop.products;
export const selectSingleProduct = (state: RootState) => state.shop.selectedProduct;
export const selectCategories = (state: RootState) => state.shop.categories;
export const selectReviews = (state: RootState) => state.shop.reviews;
export const selectMessage = (state: RootState) => state.shop.message;
export default shopSlice.reducer;
