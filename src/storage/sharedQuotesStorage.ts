import AsyncStorage from '@react-native-async-storage/async-storage';
import { Quote } from '../api/interfaces/quote';

const STORAGE_KEY = 'shared_quotes_history';

/**
 * Save a shared quote to the history.
 */
export const saveSharedQuote = async (quote: Quote): Promise<void> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    const history: Quote[] = stored ? JSON.parse(stored) : [];

    const exists = history.some((item) => item.q === quote.q && item.a === quote.a);
    if (!exists) {
      const updated = [quote, ...history];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  } catch (error) {
    console.error('Error guardando el quote compartido:', error);
  }
};

/**
 * Return shared quotes history.
 */
export const getSharedQuotes = async (): Promise<Quote[]> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error cargando el historial de quotes:', error);
    return [];
  }
};
