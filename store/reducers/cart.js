import { ADD_TO_CARD, REMOVE_FROM_CARD } from '../actions/cart';
import { DELETE_PRODUCT } from '../actions/products';

import { ADD_ORDER } from '../actions/orders';

import CartItemModel from '../../models/cart-item-model';

const initialState = {
	items: {},
	totalAmount: 0
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_CARD:
			const addedProduct = action.product;
			const prodPrice = addedProduct.price;
			const prodTitle = addedProduct.title;
			let upadtatedOrNewCartItem;
			// Check if we already have the item in the cart.
			if (state.items[addedProduct.id]) {
				upadtatedOrNewCartItem = new CartItemModel({
					quantity: state.items[addedProduct.id].quantity + 1,
					price: prodPrice,
					title: prodTitle,
					sum: state.items[addedProduct.id].sum + prodPrice
				});
			} else {
				upadtatedOrNewCartItem = new CartItemModel({
					quantity: 1,
					price: prodPrice,
					title: prodTitle,
					sum: prodPrice
				});
			}
			return {
				...state,
				items: { ...state.items, [addedProduct.id]: upadtatedOrNewCartItem },
				totalAmount: state.totalAmount + prodPrice
			};
		case REMOVE_FROM_CARD:
			const selectedCartItem = state.items[action.pid];
			const currentQty = selectedCartItem.quantity;
			let updatedCartItems;
			if (currentQty > 1) {
				// need to reduce it not erase it
				const updatedCartItem = new CartItemModel({
					quantity: selectedCartItem.quantity - 1,
					price: selectedCartItem.price,
					title: selectedCartItem.title,
					sum: selectedCartItem.sum - selectedCartItem.price
				});
				updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
			} else {
				updatedCartItems = { ...state.items };
				delete updatedCartItems[action.pid];
			}
			return {
				...state,
				items: updatedCartItems,
				totalAmount: state.totalAmount - selectedCartItem.price
			};
		case ADD_ORDER:
			return initialState; // Just clearing the cart!
		case DELETE_PRODUCT: // Admin !!!
			// If item doesn't exist...
			if (!state.items[action.pid]) {
				return state;
			}
			const updatedItems = { ...state.items };
			// In case the item is allready in the cart...
			itemTotal = state.items[action.pid].sum;
			delete updatedItems[action.pid];
			return {
				...state,
				items: updatedItems,
				totalAmount: state.totalAmount - itemTotal
			};
		default:
			return state;
	}
};
