import {
  ADD_PLACE,
  LOAD_PLACES,
  SELECT_PLACE,
} from "../actions/places.actions";

import Place from "../../models/Place";

const initialState = {
  places: [],
  selected: {},
};

const PlacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PLACE:
      return { ...state, selected: action.place };
    case ADD_PLACE:
      const newPlace = new Place(
        action.payload.id,
        action.payload.user,
        action.payload.title,
        action.payload.address,
        action.payload.image,
        action.payload.lat,
        action.payload.lng
      );
      return { ...state, places: state.places.concat(newPlace) };
    case LOAD_PLACES:
      return {
        ...state,
        places: action.places.map(
          (item) =>
            new Place(
              item.id,
              item.user,
              item.title,
              item.address,
              item.image,
              item.lat,
              item.lng
            )
        ),
      };
    default:
      return state;
  }
};

export default PlacesReducer;
