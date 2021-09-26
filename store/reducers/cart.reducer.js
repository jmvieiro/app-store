import {
  ADD_PRODUCT,
  CLEAR_CART,
  CONFIRM_CART,
  REMOVE_PRODUCT,
} from "../actions/cart.actions";

import { showAlert } from "../../utils/helper";

const initialState = {
  cart: [],
  total: 0,
  cartSize: 0,
  status: "inactive",
};

const sumTotal = (list) =>
  list
    .map((item) => parseInt(item.qty) * item.product.price)
    .reduce((a, b) => a + b, 0);
const cartSize = (list) =>
  list
    .map((item) => parseInt(item.qty))
    .reduce((a, b) => parseInt(a) + parseInt(b), 0);

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      const index = state.cart.findIndex(
        (item) => item.product.id === action.product.id
      );
      if (index === -1) {
        const product = {
          product: action.product,
          qty: parseInt(action.qty),
        };
        const updateCart = [...state.cart, product];
        return {
          ...state,
          cart: updateCart,
          total: sumTotal(updateCart),
          cartSize: cartSize(updateCart),
        };
      }
      const cart = state.cart.map((item) => {
        if (item.product.id === action.product.id) {
          if (action.update) item.qty = action.qty;
          else if (
            parseInt(item.qty) + parseInt(action.qty) <=
            parseInt(item.product.stock)
          )
            item.qty = parseInt(item.qty) + parseInt(action.qty);
          else {
            showAlert(
              `😱 El stock disponible es ${
                parseInt(item.product.stock) - parseInt(item.qty)
              }. Ingresá una cantidad menor.`,
              "",
              "error"
            );
            return;
          }
        }
        return item;
      });
      return {
        ...state,
        cart,
        total: sumTotal(cart),
        cartSize: cartSize(cart),
      };
    case REMOVE_PRODUCT:
      const updateCart = state.cart.filter(
        (item) => item.product.id !== action.id
      );
      return {
        ...state,
        cart: updateCart,
        total: sumTotal(updateCart),
        cartSize: cartSize(updateCart),
      };
    case CONFIRM_CART:
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
        total: 0,
        cartSize: 0,
        status: action.status,
      };
    default:
      return state;
  }
};

export default CartReducer;
