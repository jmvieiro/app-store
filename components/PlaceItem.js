import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import COLORS from "../constants/colors";
import React from "react";
import { TextComponent } from "./TextComponent";

export const PlaceItem = ({ title, image, address, lat, lng, onSelect }) => {
  return (
    <TouchableOpacity onPress={onSelect} style={styles.placeItem}>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.info}>
        <TextComponent style={styles.title}>{title}</TextComponent>
        <TextComponent style={styles.address}>{address}</TextComponent>
        <TextComponent style={styles.address}>{lat}</TextComponent>
        <TextComponent style={styles.address}>{lng}</TextComponent>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.primary,
  },
  info: {
    marginLeft: 25,
    //flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    color: COLORS.header,
    fontSize: 18,
    marginBottom: 6,
  },
  address: {
    color: "#777",
    fontSize: 16,
  },
});
