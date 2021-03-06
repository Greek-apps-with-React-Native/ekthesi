export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const SET_FAVORITES = 'SET_FAVORITES';

import Question from '../../models/question';

// Admin
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';

export const toggleFavorite = (id, isFav, selectedProduct) => {
	return async (dispatch, getState) => {
		try {
			const token = getState().auth.token;
			const userId = getState().auth.userId;
			// If it is a favorite, post it.
			// Note it is initially false...
			if (!isFav) {
				const response = await fetch(
					`https://ekthesi-7767c.firebaseio.com/favorites/${userId}.json?auth=${token}`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							id,
							isFav,
							selectedProduct
						})
					}
				);

				if (!response.ok) {
					throw new Error(
						'Δυστυχώς η δημιουργία νέου προϊόντος δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας.'
					);
				}
				// const resData = await response.json();

				// Note: No `name` property, that's why we use a `for_in` loop
				// console.log('POST', JSON.stringify(resData));

				dispatch({ type: TOGGLE_FAVORITE, questionId: id, selectedProduct: selectedProduct });
			} else if (isFav) {
				// First get the key in choice to delete it in second fetch(...).
				const response = await fetch(
					`https://ekthesi-7767c.firebaseio.com/favorites/${userId}.json?auth=${token}`
				);

				if (!response.ok) {
					throw new Error(
						'Δυστυχώς η διαγραφή του προϊόντος από τα αγαπημένα, δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας.'
					);
				}

				const resData = await response.json();

				// Note: No `name` property, that's why we use a `for_in` loop
				// console.log('fetch', JSON.stringify(resData));

				for (const key in resData) {
					if (resData[key].id === id) {
						await fetch(
							`https://ekthesi-7767c.firebaseio.com/favorites/${userId}/${key}.json?auth=${token}`,
							{
								method: 'DELETE'
							}
						);

						if (!response.ok) {
							throw new Error(
								'Δυστυχώς η διαγραφή του προϊόντος από τα αγαπημένα, δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας.'
							);
						}
						// console.log('fetch', JSON.stringify(resData));
						dispatch({ type: TOGGLE_FAVORITE, questionId: id, selectedProduct: selectedProduct });
					}
				}
			}
		} catch (err) {
			// send to custom analytics server
			throw err;
		}
	};
};

export const fetchFavProducts = () => {
	return async (dispatch, getState) => {
		try {
			const userId = getState().auth.userId;
			const FavResponse = await fetch(`https://ekthesi-7767c.firebaseio.com/favorites/${userId}.json`);

			// check before unpack the response body
			if (!FavResponse.ok) {
				throw new Error(
					'Δυστυχώς η φόρτωση των αγαπημένων προϊόντων δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας.'
				);
			}

			const resFavData = await FavResponse.json();

			const loadedFavorites = [];
			// If resFavData is not null then create a question...
			// Other wise we get an error in FavoritesScreen!
			if (!!resFavData) {
				let selectedProduct = null;
				for (const key in resFavData) {
					selectedProduct = resFavData[key].selectedProduct;
				}
				
				loadedFavorites.push(
					new Question({
						id: selectedProduct.id,
						categoryIds: selectedProduct.categoryIds,
						ownerId: selectedProduct.ownerId,
						index: selectedProduct.index,
						title: selectedProduct.title,
						imageUrl: selectedProduct.imageUrl,
						price: selectedProduct.price,
						description: selectedProduct.description
					})
				);
			}

			dispatch({ type: SET_FAVORITES, FavQuestions: loadedFavorites });
		} catch (err) {
			// send to custom analytics server
			console.log(err);

			throw err;
		}
	};
};

export const setFilters = (filterSettings) => {
	return { type: SET_FILTERS, filters: filterSettings };
};

// Admin
export const deleteQuestion = (questionId) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		//testing
		// const response = await fetch(`https://ekthesi-7767c.firebaseio.com/questions/${questionId}.json`, {
		const response = await fetch(`https://ekthesi-7767c.firebaseio.com/questions/${questionId}.json?auth=${token}`, {
			method: 'DELETE'
		});

		if (!response.ok) {
			throw new Error('Δυστυχώς η διαγραφή του προϊόντος δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας.');
		}

		dispatch({
			type: DELETE_QUESTION,
			pid: questionId
		});
	};
};

export const fetchProducts = () => {
	return async (dispatch, getState) => {
		try {
			const userId = getState().auth.userId;
			const response = await fetch('https://ekthesi-7767c.firebaseio.com/questions.json');

			// check before unpack the response body
			if (!response.ok) {
				throw new Error(
					'Δυστυχώς η φόρτωση των προϊόντων δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας.'
				);
			}

			const resData = await response.json();
			// console.log('fetchProducts resData.name: ', resData.name); // Why is this undefined?
			const loadedProducts = [];

			// console.log('resData', resData);

			for (const key in resData) {
				loadedProducts.push(
					new Question({
						index: resData[key].index, // for keeping the choice in cartScreen
						id: key,
						categoryIds: resData[key].categoryIds,
						ownerId: resData[key].ownerId,
						title: resData[key].title,
						imageUrl: resData[key].imageUrl,
						price: resData[key].price,
						description: resData[key].description
					})
				);
			}

			dispatch({
				type: SET_QUESTIONS,
				questions: loadedProducts,
				// Now we see only the questions of the logged in user.
				//testing
				// userQuestions: loadedProducts.filter((quest) => quest.ownerId === 'eeR9esY0l8OxcxJPPA1Gp4T5Xsy1')
				userQuestions: loadedProducts.filter((quest) => quest.ownerId === userId)
			});
		} catch (err) {
			// send to custom analytics server
			throw err;
		}
	};
};

export const createProduct = (title, categoryIds, imageUrl, price, description) => {
	return async (dispatch, getState) => {
		try {
			// SET INDEX
			// Set an index so in CartScreen you can splice the transformedCartItems,
			// so the choice of the cartItems will not change when adding/subtracting
			const res = await fetch('https://ekthesi-7767c.firebaseio.com/questions.json');
			const resD = await res.json();
			const loadedIndexes = [];
			for (const key in resD) {
				loadedIndexes.push(resD[key].index);
			}
			const arrayForIndexes = [ ...loadedIndexes ];
			let lastIndex = arrayForIndexes.pop();

			if (typeof lastIndex === 'undefined') {
				lastIndex = -1;
			}

			// CREATE PRODUCT
			const token = getState().auth.token;
			const userId = getState().auth.userId;
			// testing
			// const response = await fetch(`https://ekthesi-7767c.firebaseio.com/questions.json`, {
			const response = await fetch(`https://ekthesi-7767c.firebaseio.com/questions.json?auth=${token}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					index: lastIndex + 1, // for keeping the choice in cartScreen
					categoryIds,
					//testing
					// ownerId: 'eeR9esY0l8OxcxJPPA1Gp4T5Xsy1',
					ownerId: userId,
					title,
					imageUrl,
					price,
					description
				})
			});

			if (!response.ok) {
				throw new Error(
					'Δυστυχώς η δημιουργία νέου προϊόντος δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας.'
				);
			}

			const resData = await response.json();
			// console.log(resData.name);
			dispatch({
				type: CREATE_QUESTION,
				questionData: {
					index: lastIndex + 1, // for keeping the choice in cartScreen
					id: resData.name,
					categoryIds,
					// testing
					// ownerId: 'eeR9esY0l8OxcxJPPA1Gp4T5Xsy1',
					ownerId: userId,
					title,
					description,
					imageUrl,
					price
				}
			});
		} catch (err) {
			// send to custom analytics server
			throw err;
		}
	};
};

export const updateProduct = (id, title, categoryIds, imageUrl, price, description) => {
	return async (dispatch, getState) => {
		try {
			const userId = getState().auth.userId;
			const token = getState().auth.token;
			// testing
			// const response = await fetch(
			// `https://ekthesi-7767c.firebaseio.com/questions/eeR9esY0l8OxcxJPPA1Gp4T5Xsy1.json?`,
			// {
			const response = await fetch(`https://ekthesi-7767c.firebaseio.com/questions/${id}.json?auth=${token}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title,
					categoryIds,
					imageUrl,
					price,
					description
				})
			});

			if (!response.ok) {
				throw new Error(
					'Δυστυχώς η ανανέωση των πληροφωριών του προϊόντος δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας.'
				);
			}
			// const resData = await response.json();
			// console.log('PATCH resData.name: ', resData.name);

			dispatch({
				type: UPDATE_QUESTION,
				pid: id,
				questionData: {
					title,
					categoryIds,
					ownerId: userId,
					imageUrl,
					price,
					description
				}
			});
		} catch (err) {
			// send to custom analytics server
			throw err;
		}
	};
};
