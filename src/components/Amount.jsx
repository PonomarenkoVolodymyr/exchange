import { useDispatch, useSelector } from 'react-redux';
import { amountChange } from '../redux/amountSlice';
import { changeSelectedCurrency } from '../redux/selectCurrencySlice';
import styles from './Amount.module.css';
import { useCallback } from 'react';

const flag = {
  UAH: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/120px-Flag_of_Ukraine.svg.png',
  USD: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/120px-Flag_of_the_United_States.svg.png',
  EUR: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/250px-Flag_of_Europe.svg.png',
};

const Amount = ({ amountInputChange }) => {
  const { selectedCurrency } = useSelector((state) => state.currencySelector);
  const { fromCur, toCur } = useSelector((state) => state.currency);
  const { amount } = useSelector((state) => state.amount);
  const dispatch = useDispatch();
  const flagUrl = flag[selectedCurrency];

  const handleChange = useCallback(
    (e) => {
      let newValue = e.target.value;
      newValue = newValue.replace(',', '.');
      const filteredValue = newValue
        .replace(/[^0-9.]/g, '')
        .replace(/(\..*?)\..*/g, '$1');
      dispatch(amountChange(filteredValue));
      amountInputChange(filteredValue, fromCur, toCur);
    },
    [dispatch, amountInputChange, fromCur, toCur]
  );

  const handleFocus = (event) => {
    event.target.select();
  };

  const handleAmountSelectChange = (event) => {
    dispatch(changeSelectedCurrency(event.target.value));
  };

  return (
    <div className={styles.main}>
      <img className={styles.flag} src={flagUrl} alt="flag" />
      <select
        className={styles.select}
        value={selectedCurrency}
        onChange={handleAmountSelectChange}
      >
        <option value="UAH">UAH&nbsp;&nbsp;&nbsp;Гривня&nbsp;</option>
        <option value="EUR">EUR&nbsp;&nbsp;&nbsp;Євро&nbsp;</option>
        <option value="USD">USD&nbsp;&nbsp;&nbsp;Долар&nbsp;</option>
      </select>
      <div className={styles.input_box}>
        <input
          className={styles.input}
          type="text"
          value={amount}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </div>
    </div>
  );
};

export default Amount;
