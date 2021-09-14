import { CATEGORIES } from "../../data/categories";
import { SELECT_CATEGORY } from "../actions/category.actions";

const initialState = {
  list: CATEGORIES,
  selected: {},
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return { ...state, selected: action.payload };
    default:
      return state;
  }
};

export default CategoryReducer;
