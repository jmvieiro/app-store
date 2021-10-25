import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";
import { waitForAddress, waitForLocation } from "../../utils/helper";

import { Loader } from "../../components/Loader";
import { selectMap } from "../../store/actions/map.actions";
import { useDispatch } from "react-redux";

export const Map = () => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [selectedLocation, setSelectedLocation] = useState();
  const dispatch = useDispatch();

  const handleSelectLocation = async (event) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({
      lat: lat,
      lng: lng,
    });
    const _address = await waitForAddress(lat, lng);
    setAddress(_address);
    dispatch(
      selectMap({
        lat: lat,
        lng: lng,
        address: _address,
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
          {markerCoordinates && address != "" && (
            <Marker title={address} coordinate={markerCoordinates} />
          )}
        </MapView>
      )}
    </>
  );
};
