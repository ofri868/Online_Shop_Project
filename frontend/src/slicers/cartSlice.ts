import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { getAllProds } from '../APIs/shopAPI';
import { RootState } from '../app/store';
import { CartItem } from '../models/CartItem';

export interface CartState {
  cart: CartItem[]
  sum: number
}

const initialState: CartState = {
  cart: [],
  sum: 0
};

export const getProdsAsync = createAsyncThunk(
  'product/getAllProds',
  async () => {
    const response = await getAllProds();
    return response.data;
  }
);

export const shopSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let cartUpdated = false
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].product.desc === action.payload.desc) {
          state.cart[i].amount++
          cartUpdated = true
          break
        }
      }
      if (!cartUpdated) {
        state.cart.push({ product: action.payload, amount: 1 })
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    increaseAmount: (state, action) => {
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].product.desc === action.payload.desc) {
          state.cart[i].amount++
          break
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decreaseAmount: (state, action) => {
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].product.desc === action.payload.desc) {
          state.cart[i].amount--
          if (state.cart[i].amount === 0) {
            state.cart.splice(i, 1)
          }
          break
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    calcTotal: (state) => {
      let tempsum = 0
      for (let i = 0; i < state.cart.length; i++) {
        tempsum += (state.cart[i].amount * state.cart[i].product.price)
      }
      state.sum = tempsum
    },
    clearCart:(state)=>{
      state.cart = []
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    loadCart:(state)=>{
      state.cart = JSON.parse(localStorage.getItem("cart") || '{}')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProdsAsync.fulfilled, (state, action) => {
      })
  },
});

export const { addToCart, calcTotal, decreaseAmount, increaseAmount, clearCart, loadCart } = shopSlice.actions;
export const selectCart = (state: RootState) => state.cart.cart;
export const selectSum = (state: RootState) => state.cart.sum;
export default shopSlice.reducer;
