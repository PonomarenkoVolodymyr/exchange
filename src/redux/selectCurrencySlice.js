import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCurrency: 'UAH',
  convertedCurrency: 'USD',
};

const currencySelector = createSlice({
  name: 'currencySelector',
  initialState,
  reducers: {
    changeSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
    changeConvertedCurrency: (state, action) => {
      state.convertedCurrency = action.payload;
    },
  },
});

export const { changeSelectedCurrency, changeConvertedCurrency } =
  currencySelector.actions;

export default currencySelector.reducer;
