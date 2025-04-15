import React from 'react';
import { View, Text, StyleSheet, Share, Dimensions } from 'react-native';
import { Quote } from '../api/interfaces/quote';
import { saveSharedQuote } from '../storage/sharedQuotesStorage';
import AppButton from '../components/AppButton';

interface Props {
	quote: Quote;
	horizontal?: boolean;
}

const QuoteCard: React.FC<Props> = ({ quote, horizontal }) => {
	const handleShare = async () => {
		try {
			const result = await Share.share({
				message: `"${quote.q}" - ${quote.a}`,
			});
			if (result.action === Share.sharedAction) {
				await saveSharedQuote(quote);
				console.log('result.activityType-if: ', result);
      }
		} catch (error) {
			console.log('Error al compartir:', error);
		}
	};

	const deviceWidth: number = Dimensions.get('screen').width;
	return (
		<View style={[styles.card, horizontal && { width: deviceWidth - 40 }]}>
			<Text style={styles.quoteText}>"{quote.q}"</Text>
			<View style={styles.footer}>
				{!horizontal && (<AppButton title="share" onPress={() => handleShare()} />)}
				<Text style={[styles.author, horizontal && { flex: 1}]}>- {quote.a}</Text>
			</View>
		</View>
	);
};

export default QuoteCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#f1f1f1',
		padding: 16,
		borderRadius: 12,
		marginVertical: 12,
		elevation: 2,
		position: 'relative',
	},
	quoteText: {
		fontSize: 18,
		fontStyle: 'italic',
	},
	author: {
		fontSize: 16,
		textAlign: 'right',
		marginTop: 10,
		fontWeight: 'bold',
	},
	shareButton: {
		alignSelf: 'flex-end',
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});
