import * as Location from "expo-location";

import { Alert, StyleSheet, View } from "react-native";
import React, { useState } from "react";

import { ButtonComponent } from "./ButtonComponent";
import COLORS from "../constants/colors";
import { Loader } from "./Loader";
import { MapPreview } from "./MapPreview";
import ROUTES from "../constants/routes";
import { TextComponent } from "./TextComponent";
import { useNavigation } from "@react-navigation/native";

export const LocationSelector = (props) => {
  const navigation = useNavigation();
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(false);

  const verifyPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permisos insuficientes",
        "Necesita dar permisos de ubicación para usar la aplicación",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  const handleGetLocation = async () => {
    const isLoacitonOk = await verifyPermissions();
    if (!isLoacitonOk) return;
    const waitForData = async () => {
      setLoading(true);
      setLocation();
      const loc = await Location.getCurrentPositionAsync({ timeout: 5000 });
      if (loc) {
        setLoading(false);
        setLocation(loc);
        props.onLocation(loc);
      }
    };
    waitForData();
  };

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
          <MapPreview
            lat={location.coords.latitude}
            lng={location.coords.longitude}
          />
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
