import {
  FILTER_PRODUCTS,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
  SELECT_PRODUCT,
  _getProducts,
} from "../actions/product.actions";

const initialState = {
  list: [],
  filtered: [],
  selected: {},
  status: "inactive",
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, list: action.list, status: action.status };
    case SELECT_PRODUCT:
      return { ...state, selected: action.product };
    case FILTER_PRODUCTS:
      return {
        ...state,
        filtered: action.categoryId
          ? state.list.filter((p) => p.category == action.categoryId)
          : state.list,
      };
    case GET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        filtered: action.filtered,
      };
    default:
      return state;
  }
};

export default ProductReducer;
