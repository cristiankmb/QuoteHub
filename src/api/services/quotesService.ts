import quotesClient from '../clients/quotesClient';
import { Quote } from '../interfaces/quote';

export const getRandomQuote = async (): Promise<Quote> => {
  const response = await quotesClient.get<Quote[]>('/random');
  return response.data[0];
};

export const getTodayQuote = async (): Promise<Quote> => {
  const response = await quotesClient.get<Quote[]>('/today');
  return response.data[0];
};
