import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  } from '../APIs/shopAPI';

export interface CategoryState {
  desc: string;

}

const initialState: CategoryState = {
  desc: ''
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder

  },
});

export const { } = counterSlice.actions;
// export const selectCount = (state: RootState) => state.counter.value;
export default counterSlice.reducer;
