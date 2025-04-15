import axios from 'axios';

const quotesClient = axios.create({
  baseURL: 'https://zenquotes.io/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default quotesClient;
