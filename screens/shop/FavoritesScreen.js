import React from 'react';
import { Text, View, FlatList, StyleSheet, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import BoldText from '../../components/UI/BoldText';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';

// import DefaultText from '../components/UI/DefaultText';

const FavoritesScreen = (props) => {
	const dispatch = useDispatch();
	const favProducts = useSelector((state) => state.products.favoriteProducts);


	// Render something when no favorites are selected.
	if (favProducts.length === 0 || !favProducts) {
		return (
			<View style={styles.content}>
				<BoldText>{`Ακόμη δεν έχετε επιλέξει αγαπημένα. \nΠαρακαλώ κάντε τις επιλογές σας.\nΘα χαρούμε να σας εξυπηρετήσουμε!`}</BoldText>

			</View>
		);
	}

	return (
		<FlatList
			data={favProducts}
			keyExtractor={(item) => item.id}
			renderItem={(itemData) => (
				<ProductItem
					title={itemData.item.title}
					price={itemData.item.price}
					image={itemData.item.imageUrl}
					onToggleFavorite={() => dispatch(productActions.toggleFavorite(itemData.item.id))}
					onViewDetail={() =>
						props.navigation.navigate('DetailScreen', {
							productId: itemData.item.id,
							productTitle: itemData.item.title
						})}
					onAddToCart={() => dispatch(cartActions.addToCard(itemData.item))}
				/>
			)}
		/>
	);
};

FavoritesScreen.navigationOptions = ({navigation}) => {
	return {
		headerTitle: 'Αγαπημένα',
		// headerLeft: (
		// 	<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
		// 		<Item
		// 			title="goBack"
		// 			iconName={Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back'}
		// 			onPress={() => navigation.pop()}
		// 		/>
		// 	</HeaderButtons>
		// ),
		headerRight: (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="card"
					iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
					onPress={() => navigation.navigate({routeName: 'Cart'})}
				/>
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		margin: 12
	}
});

export default FavoritesScreen;
