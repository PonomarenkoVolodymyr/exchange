import { useDispatch, useSelector } from 'react-redux';
import { changeConvertedCurrency } from '../redux/selectCurrencySlice';
import { convertedChange } from '../redux/amountSlice';
import styles from './Amount.module.css';

const flag = {
  UAH: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/120px-Flag_of_Ukraine.svg.png',
  USD: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/120px-Flag_of_the_United_States.svg.png',
  EUR: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/250px-Flag_of_Europe.svg.png',
};

const ConvertedAmount = ({ convertedInputChange }) => {
  const { convertedCurrency } = useSelector((state) => state.currencySelector);
  const { fromCur, toCur } = useSelector((state) => state.currency);
  const { converted } = useSelector((state) => state.amount);
  const dispatch = useDispatch();
  const flagUrl = flag[convertedCurrency];

  const handleChange = (e) => {
    let newValue = e.target.value;
    newValue = newValue.replace(',', '.');
    const filteredValue = newValue.replace(/[^0-9]/g, '');
    dispatch(convertedChange(filteredValue));
    convertedInputChange(filteredValue, fromCur, toCur);
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  const handleConvertedSelectChange = (event) => {
    dispatch(changeConvertedCurrency(event.target.value));
  };

  return (
    <div className={styles.main}>
      <img className={styles.flag} src={flagUrl} alt="flag" />
      <select
        className={styles.select}
        value={convertedCurrency}
        onChange={handleConvertedSelectChange}
      >
        <option value="UAH">UAH&nbsp;&nbsp;&nbsp;Гривня&nbsp;</option>
        <option value="EUR">EUR&nbsp;&nbsp;&nbsp;Євро&nbsp;</option>
        <option value="USD">USD&nbsp;&nbsp;&nbsp;Долар&nbsp;</option>
      </select>
      <div className={styles.input_box}>
        <input
          className={styles.input}
          type="text"
          value={converted}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </div>
    </div>
  );
};

export default ConvertedAmount;
