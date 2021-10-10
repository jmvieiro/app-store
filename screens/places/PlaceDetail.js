import { Image, StyleSheet } from "react-native";

import COLORS from "../../constants/colors";
import React from "react";
import { Screen } from "../Screen";
import { TextComponent } from "../../components/TextComponent";
import { useSelector } from "react-redux";

export const PlaceDetail = ({ navigation }) => {
  const place = useSelector((state) => state.places.selected);

  return (
    <Screen>
      <TextComponent style={styles.title}>({place.id}) {place.title}</TextComponent>
      <Image style={styles.image} source={{ uri: place.image }} />
      <TextComponent>Dirección: {place.address}</TextComponent>
      <TextComponent>Latitud: {place.lat}</TextComponent>
      <TextComponent>Longitud: {place.lng}</TextComponent>
    </Screen>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "70%",
    height: "70%",
    backgroundColor: COLORS.primary,
  },
  info: {
    marginLeft: 25,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    color: COLORS.header,
    fontSize: 22,
    marginBottom: 16,
  },
  address: {
    color: "#777",
    fontSize: 16,
  },
});
