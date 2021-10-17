import { SELECT_MAP } from "../actions/map.actions";

const initialState = {
  selected: {},
};

const MapReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_MAP:
      return { ...state, selected: action.map };
    default:
      return state;
  }
};

export default MapReducer;
