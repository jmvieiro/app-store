import { GET_ORDERS_BY_EMAIL, SELECT_ORDER } from "../actions/order.actions";

const initialState = {
  list: [],
  selected: {},
  status: "inactive",
};

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_BY_EMAIL:
      return { ...state, list: action.list, status: action.status };
    case SELECT_ORDER:
      return { ...state, selected: action.order };
    default:
      return state;
  }
};

export default OrderReducer;
