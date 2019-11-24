This is an app for church products. In other words it's a shop-app. It is kind of a copy of this Udemy cource: 
[React Native - The Practical Guide](https://www.udemy.com/react-native-the-practical-guide/)

## Extra features added:
### The configureStore file.
### Using an object in the Models.
### In UI: the <Line />, <BoldText />
### Favorites...
### A plus and a minus sign to add/subtrack products in the cartScreen.
### Two option of navigation: 1. Side Drawer or 2. Bottom Tabs.
### Show an alert in AdminScreen if a chosen product to be deleted is already in the cart of a client.
### Added CustomLinearGradient
### Put login/singup in sidedrawer and hide the adminScreen from normal users...
### Added GFSNeohellenic Fonts
### User's Screen with email.

## TODO
### DONE! fix scrollView when having a lot of items in CartScreen,
### DONE! fix bug: When logging or singing in you need to click back to the email input field other wise the passward in ommited...
### DONE! put a plus/minus sign to add/remove products in the cartScreen.
### DONE! Show an alert in AdminScreen if a chosen product to be deleted is already in the cart of a client. 
### DONE! fix bug: ProductsOverViewScreen and AdminProductsOverview shows no products available just before loading them, while it should show the spinner.
### DONE! put LinearGradient in all screens
### DONE! fix UI for small screens
### DONE! Put login/singup in sidedrawer and hide the adminScreen from normal users...
### DONE! fix bug: favorite (in ProductsDetailScreen) snaps back to false if you go back to ProductsOverviewScreen and forth to ProductsDetailScreen.
### DONE! fix bug: in cartScreen the order of the products changes when you change the amount of the second...
### DONE! change back commented code in firebase, ...Navigator and actions/orders to need token and get AuthScreen... find 'testing'
### DONE! Fix bug: Load all products when from favoritesScreen,
### user clicks to go to DetailesScreen Other wise the app can not find wich of the availabelProducts to show.
### DONE! Hide admin button for normal users in sidedrawer...
### DONE! Load state of product, if favorite, from firebase...
### DONE! Fix bug: Jumping between different navigation groups. i.e. From FavoritesScreen to DetailsScreen.
### DONE! fix bug: Load orders, favorites per normal user...
### DONE! Add a categories screen also to adminsScreen...
### DONE! Add an alert with the categoryIds in the EditProductScreen
### DONE! Add price validation that it doesn't have commas but fullstops...
### DONE! Load products etc per admin user...
### DONE! show dots ... when the title is to long.
### DONE! Add a user's Screen with email.
### DONE! Add alert that visitor needs to create an account in order to make an order.

### Fix the card's dimensions everywhere you use it.
### Add posibility to change password...
### Delete product file and everything else it's not needed.
### Authentication with roles: diferent signups/logins for admis and users.
### add some code for github security...
### Use pictures in CategoriesScreen in the Card. This, is actually taken from the Meals app.
### refresh the token so the user doesn't get automatic logged out after 1 hour.

# Packages installed:
### redux react-redux react-navigation react-navigation-stack react-navigation-header-buttons, react-navigation react-navigation-tabs react-navigation react-navigation-drawer 
### react-navigation-material-bottom-tabs 
### react-native-paper
### !!! expo install react-native-gesture-handler react-native-reanimated
### expo-font
### npm install --save-dev redux-devtools-extension 
### redux-thunk
### moment (for formating dates)
### react-moment (for formating dates)
### moment-timezone (for formating dates)
### react-native-screens
### react-native-elements
### expo-linear-gradient
### react-navigation-transitions
### react-native-icons

### expo publish
### expo build:android -t app-bundle  
### expo fetch:android:keystore
### expo upload:android