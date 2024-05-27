import axios from 'axios';

export const fetchCurrencyRates = async () => {
  try {
    const response = await axios.get('https://api.monobank.ua/bank/currency');
    return response.data;
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    return null;
  }
};
