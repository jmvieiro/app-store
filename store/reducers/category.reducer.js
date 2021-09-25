import { GET_CATEGORIES, SELECT_CATEGORY } from "../actions/category.actions";

const initialState = {
  list: [],
  selected: {},
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, list: action.list, status: action.status };
    case SELECT_CATEGORY:
      return { ...state, selected: action.category };
    default:
      return state;
  }
};

export default CategoryReducer;
