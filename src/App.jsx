import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Amount from './components/Amount';
import Changer from './components/Changer';
import ConvertedAmount from './components/ConvertedAmount';
import Loader from './components/Loader/Loader';
import { fetchCurrencyRates } from './utils/fetchCurrencyRates';
import { useDispatch, useSelector } from 'react-redux';
import { amountChange, convertedChange } from './redux/amountSlice';
import { fromCurChange, toCurChange } from './redux/currencySlice';

function App() {
  const [currencyRates, setCurrencyRates] = useState(null);
  const { selectedCurrency, convertedCurrency } = useSelector(
    (state) => state.currencySelector
  );

  const { amount, converted } = useSelector((state) => state.amount);
  const { fromCur, toCur } = useSelector((state) => state.currency);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rates = await fetchCurrencyRates();
        if (rates) {
          setCurrencyRates(rates);
        }
      } catch (error) {
        console.error('Error fetching currency rates:', error.message);
      }
    };

    fetchData();
  }, []);

  const currencyArguments = () => {
    let fromCur;
    let toCur;
    if (!currencyRates) {
      fromCur = 1;
      toCur = 1;
    } else {
      switch (true) {
        case selectedCurrency === 'UAH' && convertedCurrency === 'USD':
          fromCur = currencyRates[0].rateBuy;
          toCur = 1;
          break;
        case selectedCurrency === 'UAH' && convertedCurrency === 'EUR':
          fromCur = currencyRates[1].rateBuy;
          toCur = 1;
          break;
        case selectedCurrency === 'USD' && convertedCurrency === 'UAH':
          fromCur = 1;
          toCur = currencyRates[0].rateSell;
          break;
        case selectedCurrency === 'USD' && convertedCurrency === 'EUR':
          fromCur = currencyRates[2].rateSell;
          toCur = currencyRates[2].rateBuy;
          break;
        case selectedCurrency === 'EUR' && convertedCurrency === 'UAH':
          fromCur = 1;
          toCur = currencyRates[1].rateSell;
          break;
        case selectedCurrency === 'EUR' && convertedCurrency === 'USD':
          fromCur = currencyRates[2].rateBuy;
          toCur = currencyRates[2].rateSell;
          break;
        case selectedCurrency === 'UAH' && convertedCurrency === 'UAH':
        case selectedCurrency === 'USD' && convertedCurrency === 'USD':
        case selectedCurrency === 'EUR' && convertedCurrency === 'EUR':
          fromCur = 1;
          toCur = 1;
          break;
        default:
          fromCur = 1;
          toCur = 1;
      }
    }
    dispatch(fromCurChange(fromCur));
    dispatch(toCurChange(toCur));
    return { fromCur, toCur };
  };

  const amountInputChange = (amount, fromCur, toCur) => {
    if (amount) {
      const result =
        (parseFloat(amount, 10) * parseFloat(toCur, 10)) /
        parseFloat(fromCur, 10);
      dispatch(convertedChange(result.toFixed(2)));
    } else {
      dispatch(convertedChange(''));
    }
  };

  const convertedInputChange = (converted) => {
    if (converted) {
      if (fromCur !== 0 && toCur !== 0) {
        const result2 =
          (parseFloat(converted, 10) * parseFloat(fromCur, 10)) /
          parseFloat(toCur, 10);
        dispatch(amountChange(result2.toFixed(2)));
      }
    } else {
      dispatch(amountChange(''));
    }
  };

  useEffect(() => {
    if (currencyRates) {
      const { fromCur, toCur } = currencyArguments();
      if (amount) {
        amountInputChange(amount, fromCur, toCur);
      }
    }
  }, [selectedCurrency, convertedCurrency, currencyRates]);

  return (
    <div>
      {currencyRates ? (
        <div className="app">
          <div className="main">
            <Header currencyRates={currencyRates} />
            <Amount amountInputChange={amountInputChange} />
            <Changer />
            <ConvertedAmount convertedInputChange={convertedInputChange} />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
