import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { checkout } from '../APIs/cartAPI';
import { RootState } from '../app/store';
import { CartItem } from '../models/CartItem';

export interface CartState {
  cart: CartItem[]
  sum: number
  shown: boolean
}

const initialState: CartState = {
  cart: [],
  sum: 0,
  shown: false
};

export const checkoutAsync = createAsyncThunk(
  'product/checkout',
  async (data:{order:{product:number | undefined, amount:number}[], myToken:string}) => {
    const response = await checkout(data.order, data.myToken);
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
        if (state.cart[i].product.desc === action.payload.product['desc']) {
          state.cart[i].amount = action.payload.amount
          cartUpdated = true
          break
        }
      }
      if (!cartUpdated) {
        state.cart.push({ product: action.payload.product, amount: action.payload.amount })
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
          if (state.cart[i].amount < 1) {
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
      state.cart = JSON.parse(localStorage.getItem("cart") || '[]')
    },
    removeFromCart:(state, action)=>{
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].product.id === action.payload) {
          state.cart.splice(i, 1)
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    showCart:(state)=>{
      state.shown = true
    },
    hideCart:(state)=>{
      state.shown = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkoutAsync.fulfilled, (state, action) => {
        console.log(action.payload)
      })
  },
});

export const {hideCart, showCart, addToCart, calcTotal, decreaseAmount, increaseAmount, clearCart, loadCart, removeFromCart } = shopSlice.actions;
export const selectCart = (state: RootState) => state.cart.cart;
export const selectSum = (state: RootState) => state.cart.sum;
export const selectShown = (state: RootState) => state.cart.shown;
export default shopSlice.reducer;
