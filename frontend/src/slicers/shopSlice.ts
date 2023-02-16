import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { getProds, addProd, updateProd, deleteProd, getReviews, addReview, getBrands, getScales } from '../APIs/shopAPI';
import { RootState } from '../app/store';
import { Brand } from '../models/Brand';
import { Product } from '../models/Product';
import { Review } from '../models/Review';
import { Scale } from '../models/Scale';

export interface ShopState {
  brands: Brand[]
  scales: Scale[]
  products: Product[]
  selectedProduct: Product
  reviews: Review[]
  message: string
}

const initialState: ShopState = {
  products: [],
  brands: [],
  selectedProduct: { id: -1, title:'', image: '', brand: { desc: '' }, scale: { desc: '' }, desc: '', price: 0 },
  reviews: [],
  message: '',
  scales: []
};

export const getProdsAsync = createAsyncThunk(
  'product/getProds',
  async () => {
    const response = await getProds();
    return response.data;
  }
);

export const getBrandsAsync = createAsyncThunk(
  'product/getBrands',
  async () => {
    const response = await getBrands();
    return response.data;
  }
);

export const getScalesAsync = createAsyncThunk(
  'product/getScales',
  async () => {
    const response = await getScales();
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
      .addCase(getBrandsAsync.fulfilled, (state, action) => {
        state.brands = action.payload
      })
      .addCase(getScalesAsync.fulfilled, (state, action) => {
        state.scales = action.payload
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
export const selectBrands = (state: RootState) => state.shop.brands;
export const selectScales = (state: RootState) => state.shop.scales;
export const selectReviews = (state: RootState) => state.shop.reviews;
export const selectMessage = (state: RootState) => state.shop.message;
export default shopSlice.reducer;
