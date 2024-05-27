import { configureStore } from '@reduxjs/toolkit';
import amountReducer from './amountSlice';
import currencySelectorReducer from './selectCurrencySlice';
import currencyReducer from './currencySlice';

export const store = configureStore({
  reducer: {
    amount: amountReducer,
    currencySelector: currencySelectorReducer,
    currency: currencyReducer,
  },
});
