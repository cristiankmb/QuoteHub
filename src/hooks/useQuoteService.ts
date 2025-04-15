import { useQuote } from './useQuote';
import { getRandomQuote, getTodayQuote } from '../api/services/quotesService';

export function useQuoteService() {
  const random = useQuote(getRandomQuote);
  const today = useQuote(getTodayQuote);

  return {
    randomQuote: random,
    todayQuote: today,
  };
}
