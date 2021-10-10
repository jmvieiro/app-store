import MapView, { Marker } from "react-native-maps";
import React, { useState } from "react";

export const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState();
  const handleSelectLocation = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };
  let markerCoordinates;
  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }
  const initialRegion = {
    latitude: -34.60838645489025,
    longitude: -58.37224022456954,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return (
    <MapView
      initialRegion={initialRegion}
      onPress={handleSelectLocation}
      style={{ flex: 1 }}
    >
      {markerCoordinates && (
        <Marker title="Ubicación seleccionada" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};
