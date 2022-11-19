import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import blockchainReducer from "./Reducer.js/blockchainReducer";
import { cartReducer } from "./Reducer.js/cartReducer";
import { categoryReducer } from "./Reducer.js/categoryReducer";
import { modalReducer } from "./Reducer.js/modalReducer";
import { productReducer } from "./Reducer.js/productReducer";
import { sellerReducer } from "./Reducer.js/sellerReducer";
import { storeReducer } from "./Reducer.js/StoreReducer";
import { userReducer } from "./Reducer.js/userReducer";
import { workerCategoryReducer } from "./Reducer.js/workerCategoryReducer";
import { workerReducer } from "./Reducer.js/workerReducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  productList: productReducer,
  user: userReducer,
  cart: cartReducer,
  store: storeReducer,
  worker: workerReducer,
  model: modalReducer,
  seller: sellerReducer,
  categories: categoryReducer,
  workerCategories: workerCategoryReducer,
});

export const store = createStore(
  reducer,
  {},
  composeEnhancer(applyMiddleware(thunk))
);
