import React, { useState } from 'react';
import styles from './Changer.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSelectedCurrency,
  changeConvertedCurrency,
} from '../redux/selectCurrencySlice';

const Changer = () => {
  const [clicked, setClicked] = useState(false);
  const { selectedCurrency, convertedCurrency } = useSelector(
    (state) => state.currencySelector
  );

  const dispatch = useDispatch();

  const changeClick = () => {
    dispatch(changeSelectedCurrency(convertedCurrency));
    dispatch(changeConvertedCurrency(selectedCurrency));
    setClicked(!clicked);
  };

  return (
    <div className={styles.changerContainer}>
      <div className={styles.centerLine}>
        <div className={styles.imageContainer}>
          <svg
            className={`${styles.changerImage} ${
              clicked ? styles.clicked : ''
            }`}
            onClick={changeClick}
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M44 22C44 34.1503 34.1503 44 22 44C9.84974 44 0 34.1503 0 22C0 9.84974 9.84974 0 22 0C34.1503 0 44 9.84974 44 22Z"
              fill="#26278D"
            />
            <path
              d="M23.23 25.75C23.23 26.0214 23.3183 26.2855 23.4817 26.5022C23.645 26.719 23.8745 26.8767 24.1354 26.9516C24.3963 27.0264 24.6745 27.0143 24.9279 26.917C25.1813 26.8198 25.3961 26.6427 25.54 26.4125L28.9 23.0537C29.0161 22.9376 29.1081 22.7998 29.1709 22.648C29.2337 22.4963 29.2659 22.3337 29.2659 22.1696C29.2658 22.0054 29.2334 21.8428 29.1705 21.6911C29.1076 21.5395 29.0155 21.4017 28.8994 21.2856C28.7832 21.1696 28.6454 21.0775 28.4937 21.0147C28.342 20.952 28.1794 20.9197 28.0152 20.9197C27.851 20.9198 27.6884 20.9522 27.5368 21.0151C27.3851 21.078 27.2473 21.1701 27.1312 21.2862L25.7312 22.6862V13.25C25.7312 12.9185 25.5995 12.6005 25.3651 12.3661C25.1307 12.1317 24.8128 12 24.4812 12C24.1497 12 23.8318 12.1317 23.5974 12.3661C23.3629 12.6005 23.2312 12.9185 23.2312 13.25V25.75H23.23Z"
              fill="white"
            />
            <path
              d="M20.77 18.25C20.77 17.9786 20.6816 17.7145 20.5183 17.4978C20.355 17.281 20.1255 17.1233 19.8646 17.0484C19.6037 16.9736 19.3255 16.9857 19.0721 17.083C18.8187 17.1802 18.6038 17.3573 18.46 17.5875L15.1012 20.9462C14.9819 21.0616 14.8866 21.1995 14.8211 21.352C14.7556 21.5045 14.7211 21.6685 14.7197 21.8345C14.7182 22.0005 14.7499 22.1651 14.8127 22.3187C14.8756 22.4723 14.9684 22.6119 15.0858 22.7292C15.2031 22.8466 15.3427 22.9394 15.4963 23.0023C15.6499 23.0651 15.8145 23.0968 15.9805 23.0953C16.1465 23.0939 16.3105 23.0594 16.463 22.9939C16.6155 22.9284 16.7534 22.8331 16.8687 22.7137L18.27 21.3138V30.75C18.27 31.0815 18.4017 31.3995 18.6361 31.6339C18.8705 31.8683 19.1885 32 19.52 32C19.8515 32 20.1695 31.8683 20.4039 31.6339C20.6383 31.3995 20.77 31.0815 20.77 30.75V18.25Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Changer;
