import React, {useEffect, useState} from 'react';
import { Text, StyleSheet, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { useQuoteService } from '../hooks/useQuoteService';
import { getSharedQuotes } from '../storage/sharedQuotesStorage';
import { Quote } from '../api/interfaces/quote';
import QuoteCard from '../components/QuoteCard';
import AppButton from '../components/AppButton';

const HomeScreen = () => {
  const { randomQuote, todayQuote } = useQuoteService();
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      const data = await getSharedQuotes();
      setQuotes(data);
    };
    loadHistory();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.textTitle}>
        Today Quote
      </Text>
      {todayQuote.loading && <ActivityIndicator />}
      {todayQuote.error && <Text style={styles.error}>{todayQuote.error}</Text>}
      {todayQuote.quote && <QuoteCard quote={todayQuote.quote} />}
      <Text style={styles.textTitle}>
        Recommended Quotes
      </Text>
      <AppButton title="Show other" onPress={() => randomQuote.refetch()} />
      {randomQuote.loading && <ActivityIndicator />}
      {randomQuote.error && <Text style={styles.error}>{randomQuote.error}</Text>}
      {randomQuote.quote && <QuoteCard quote={randomQuote.quote} />}
      <Text style={styles.textTitle}>
        Shared Quotes
      </Text>
      <FlatList
        data={quotes}
        horizontal
        renderItem={({item}) => <QuoteCard quote={item} horizontal />}
        keyExtractor={(item) => item.q}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        pagingEnabled
      />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  textTitle: {
    fontSize: 25,
    fontWeight: '700',
    color: '#171717',
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
