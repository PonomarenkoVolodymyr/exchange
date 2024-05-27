import React from 'react';
import styles from './Header.module.css';

const Header = ({ currencyRates }) => {
  const rates = {
    usBuy: currencyRates[0].rateBuy,
    usSale: currencyRates[0].rateSell,
    eurBuy: currencyRates[1].rateBuy,
    eurSale: currencyRates[1].rateSell,
    usEuBuy: currencyRates[2].rateBuy,
    usEuSale: currencyRates[2].rateSale,
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>Currency Exchange Rates</h1>
      <h3 className={styles.h4}>
        Live currency rates MONOBank to UAH: USD: {rates.usBuy} / {rates.usSale}{' '}
        EUR: {rates.eurBuy} / {rates.eurSale}
      </h3>
    </header>
  );
};
export default Header;
