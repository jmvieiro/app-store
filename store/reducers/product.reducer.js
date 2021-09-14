import { FILTER_PRODUCTS, SELECT_PRODUCT } from "../actions/product.actions";

import { PRODUCTS } from "../../data/products";

const initialState = {
  list: PRODUCTS,
  filtered: [],
  selected: {},
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      return { ...state, selected: action.payload };
    case FILTER_PRODUCTS:
      return {
        ...state,
        filtered: action.payload.id
          ? state.list.filter((p) => p.category == action.payload.id)
          : state.list,
      };
    default:
      return state;
  }
};

export default ProductReducer;
