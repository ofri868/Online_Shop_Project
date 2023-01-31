import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import shopReducer from '../slicers/shopSlice';
import cartReducer from '../slicers/cartSlice';
import authReducer from '../slicers/authSlice';
// import categoryReducer from '../slicers/categorySlice';

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    cart: cartReducer,
    auth: authReducer
    // category: categoryReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
