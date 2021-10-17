import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { ButtonComponent } from "./ButtonComponent";
import COLORS from "../constants/colors";
import { Loader } from "./Loader";
import { MapPreview } from "./MapPreview";
import ROUTES from "../constants/routes";
import { TextComponent } from "./TextComponent";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { waitForLocation } from "../utils/helper";

export const LocationSelector = (props) => {
  const map = useSelector((state) => state.map.selected);
  const navigation = useNavigation();
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(false);

  const handleGetLocation = async () => {
    setLoading(true);
    setLocation();
    const loc = await waitForLocation();
    if (loc) {
      setLoading(false);
      setLocation({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      });
      props.onLocation({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      });
    }
  };

  useEffect(() => {
    if (map.lat && map.lng) {
      setLocation({
        lat: map.lat,
        lng: map.lng,
      });
      props.onLocation({
        lat: map.lat,
        lng: map.lng,
      });
    }
  }, [map]);

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {!location ? (
          !loading ? (
            <TextComponent>Ubicación</TextComponent>
          ) : (
            <Loader />
          )
        ) : (
          <MapPreview lat={location.lat} lng={location.lng} />
        )}
      </View>

      <View style={{ height: "50%" }}>
        <ButtonComponent
          title="Obtener ubicación"
          handleClick={handleGetLocation}
          style={{
            backgroundColor: COLORS.primary,
            width: 90,
            height: "100%",
            justifyContent: "center",
            padding: 0,
          }}
        />
        <ButtonComponent
          title="Elegir del mapa"
          handleClick={() => {
            navigation.navigate(ROUTES.MAP);
          }}
          style={{
            backgroundColor: COLORS.gray,
            width: 90,
            height: "100%",
            justifyContent: "center",
            padding: 0,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: "row",
  },
  preview: {
    paddingHorizontal: 20,
    borderRadius: 6,
    height: 225,
    justifyContent: "center",
    borderColor: COLORS.header,
    borderWidth: 1,
    flex: 1,
  },
});
