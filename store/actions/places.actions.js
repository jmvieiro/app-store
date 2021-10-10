import * as FileSystem from "expo-file-system";

import { getAddresses, insertAddress } from "../../db/db";

import { MAP_API } from "../../constants/map";

export const ADD_PLACE = "ADD_PLACE";
export const LOAD_PLACES = "LOAD_PLACES";
export const SELECT_PLACE = "SELECT_PLACE";

export const addPlace = (user, title, image, lat, lng) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const Path = FileSystem.documentDirectory + fileName;
    try {
      const googleAddress = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAP_API}`
      );
      const response = await googleAddress.json();
      let address = "Dirección no encontrada";
      if (
        response.status.toLowerCase() === "ok" &&
        response.plus_code.compound_code
      )
        address = response.results[0].formatted_address;
      FileSystem.moveAsync({
        from: image,
        to: Path,
      });
      const result = await insertAddress(user, title, Path, address, lat, lng);
      dispatch({
        type: ADD_PLACE,
        payload: {
          id: result.insertId,
          user,
          title,
          address,
          image: Path,
          lat,
          lng,
        },
      });
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  };
};

export const loadPlaces = (email) => {
  return async (dispatch) => {
    try {
      const result = await getAddresses(email);
      dispatch({ type: LOAD_PLACES, places: result.rows._array });
    } catch (error) {
      throw error;
    }
  };
};

export const selectPlace = (place) => ({
  type: SELECT_PLACE,
  place,
});
