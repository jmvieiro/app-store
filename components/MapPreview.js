import { Image, StyleSheet, View } from "react-native";

import { MAP_API } from "../constants/map";
import React from "react";
import { TextComponent } from "./TextComponent";

export const MapPreview = (props) => {
  const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.lat},${props.lng}&zoom=16&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7C${props.lat},${props.lng}&key=${MAP_API}`;
  return (
    <View style={styles.mapPreview}>
      {props.lat && props.lng && (
        <>
          <Image style={styles.mapImage} source={{ uri: mapPreviewUrl }} />
          <TextComponent>{props.address}</TextComponent>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: { alignItems: "center", justifyContent: "center" },
  mapImage: { width: "90%", height: "75%" },
});
