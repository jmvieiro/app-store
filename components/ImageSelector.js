import { Image, StyleSheet, View } from "react-native";
import React, { useState } from "react";

import { ButtonComponent } from "./ButtonComponent";
import COLORS from "../constants/colors";
import { TextComponent } from "./TextComponent";
import { waitForCamera } from "../utils/helper";

export const ImageSelector = (props) => {
  const [pickedUri, setPickedUri] = useState();

  const handleTakeImage = async () => {
    const image = await waitForCamera();
    setPickedUri(image.uri);
    props.onImage(image.uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {!pickedUri ? (
          <TextComponent style={{}}>Seleccioná una imagen</TextComponent>
        ) : (
          <Image style={styles.image} source={{ uri: pickedUri }} />
        )}
      </View>
      <ButtonComponent
        title="Tomar Foto"
        handleClick={handleTakeImage}
        style={{
          backgroundColor: COLORS.primary,
          width: 90,
          height: "100%",
          justifyContent: "center",
          padding: 0,
        }}
      />
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
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: "90%",
  },
});
