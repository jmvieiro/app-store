import { applyMiddleware, combineReducers, createStore } from "redux";

import AuthReducer from "./reducers/auth.reducer";
import CartReducer from "./reducers/cart.reducer";
import CategoryReducer from "./reducers/category.reducer";
import OrderReducer from "./reducers/order.reducer";
import PlacesReducer from "./reducers/places.reducer";
import ProductReducer from "./reducers/product.reducer";
import thunk from "redux-thunk";

const RootReducer = combineReducers({
  categories: CategoryReducer,
  products: ProductReducer,
  cart: CartReducer,
  auth: AuthReducer,
  orders: OrderReducer,
  places: PlacesReducer
});

export default createStore(RootReducer, applyMiddleware(thunk));
