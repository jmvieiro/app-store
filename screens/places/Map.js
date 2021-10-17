import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";

import { Loader } from "../../components/Loader";
import { selectMap } from "../../store/actions/map.actions";
import { useDispatch } from "react-redux";
import { waitForLocation } from "../../utils/helper";

export const Map = () => {
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState();
  const dispatch = useDispatch();

  const handleSelectLocation = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
    dispatch(
      selectMap({
        lat: event.nativeEvent.coordinate.latitude,
        lng: event.nativeEvent.coordinate.longitude,
      })
    );
  };

  let markerCoordinates;
  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  let initialRegion = null;

  useEffect(() => {
    const wait = async () => {
      setLoading(true);
      const loc = await waitForLocation();
      if (loc) {
        setLoading(false);
        initialRegion = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
      }
    };
    wait();
  }, []);

  return (
    <>
      {loading && !initialRegion ? (
        <Loader />
      ) : (
        <MapView
          initialRegion={initialRegion}
          onPress={handleSelectLocation}
          style={{ flex: 1 }}
        >
          {markerCoordinates && (
            <Marker
              title="Ubicación seleccionada"
              coordinate={markerCoordinates}
            />
          )}
        </MapView>
      )}
    </>
  );
};
