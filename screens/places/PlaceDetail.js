import { Image, StyleSheet, View } from "react-native";

import COLORS from "../../constants/colors";
import { MapPreview } from "../../components/MapPreview";
import React from "react";
import { Screen } from "../Screen";
import { TextComponent } from "../../components/TextComponent";
import { useSelector } from "react-redux";

export const PlaceDetail = ({}) => {
  const place = useSelector((state) => state.places.selected);

  return (
    <Screen>
      <View style={styles.modalContainer}>
        <TextComponent style={styles.title}>
          ({place.id}) {place.title}
        </TextComponent>
      </View>
      <View style={styles.img}>
        <Image style={styles.image} source={{ uri: place.image }} />
      </View>
      <View style={styles.map}>
        <MapPreview lat={place.lat} lng={place.lng} address={place.address} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: "center",
    alignSelf: "center",
  },
  map: { flex: 0.4 },
  img: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    color: COLORS.header,
    fontSize: 25,
    marginBottom: 5,
  },
});
