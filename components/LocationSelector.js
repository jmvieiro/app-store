import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { waitForAddress, waitForLocation } from "../utils/helper";

import { ButtonComponent } from "./ButtonComponent";
import COLORS from "../constants/colors";
import { Loader } from "./Loader";
import { MapPreview } from "./MapPreview";
import ROUTES from "../constants/routes";
import { TextComponent } from "./TextComponent";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

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
      const _address = await waitForAddress(
        loc.coords.latitude,
        loc.coords.longitude
      );
      setLocation({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
        address: _address,
      });
      props.onLocation({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
        address: _address,
      });
    }
  };

  useEffect(() => {
    if (map.lat && map.lng) {
      setLocation({
        lat: map.lat,
        lng: map.lng,
        address: map.address,
      });
      props.onLocation({
        lat: map.lat,
        lng: map.lng,
        address: map.address,
      });
    }
  }, [map]);

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        <View
          style={{
            flex: 1,
            alignSelf: "center",
          }}
        >
          {!location ? (
            !loading ? (
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <TextComponent>Ubicación</TextComponent>
              </View>
            ) : (
              <Loader />
            )
          ) : (
            <MapPreview
              lat={location.lat}
              lng={location.lng}
              address={location.address}
            />
          )}
        </View>

        <View style={{ height: "50%" }}>
          <ButtonComponent
            title="Obtener ubicación"
            handleClick={handleGetLocation}
            style={{ ...styles.button, ...styles.button1 }}
          />
          <ButtonComponent
            title="Elegir del mapa"
            handleClick={() => {
              navigation.navigate(ROUTES.MAP);
            }}
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  preview: {
    borderRadius: 6,
    height: 225,
    justifyContent: "center",
    borderColor: COLORS.header,
    borderWidth: 1,
    flexDirection: "row",
  },
  button: {
    borderWidth: 0,
    borderRadius: 0,
    borderBottomRightRadius: 6,
    backgroundColor: COLORS.gray,
    width: 90,
    height: "100%",
    justifyContent: "center",
    padding: 0,
  },
  button1: {
    borderRadius: 0,
    borderTopRightRadius: 6,
    backgroundColor: COLORS.primary,
  },
});
