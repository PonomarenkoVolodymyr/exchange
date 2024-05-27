import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  amount: 0,
  converted: 0,
};

export const amountSlice = createSlice({
  name: 'amount',
  initialState,
  reducers: {
    amountChange: (state, action) => {
      state.amount = action.payload;
    },
    convertedChange: (state, action) => {
      state.converted = action.payload;
    },
  },
});

export const { amountChange, convertedChange } = amountSlice.actions;

export default amountSlice.reducer;
