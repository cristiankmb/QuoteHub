import { useEffect, useState } from 'react';
import { Quote } from '../api/interfaces/quote';

type QuoteFetcher = () => Promise<Quote>;

export function useQuote(fetcher: QuoteFetcher) {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const result = await fetcher();
      setQuote(result);
      setError(null);
    } catch (err) {
      setError('Error al obtener la frase.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return { quote, loading, error, refetch: fetchQuote };
}
