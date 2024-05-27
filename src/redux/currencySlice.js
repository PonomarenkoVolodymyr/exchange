import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fromCur: 1,
  toCur: 1,
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    fromCurChange: (state, action) => {
      state.fromCur = action.payload;
    },
    toCurChange: (state, action) => {
      state.toCur = action.payload;
    },
  },
});

export const { fromCurChange, toCurChange } = currencySlice.actions;

export default currencySlice.reducer;
