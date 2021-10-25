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
        <View
          style={{
            flex: 1,
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          {!pickedUri ? (
            <TextComponent style={{}}>Seleccioná una imagen</TextComponent>
          ) : (
            <Image style={styles.image} source={{ uri: pickedUri }} />
          )}
        </View>
        <ButtonComponent
          title="Tomar Foto"
          handleClick={handleTakeImage}
          style={styles.button}
        />
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
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    width: "90%",
    height: "90%",
  },
  button: {
    borderWidth: 0,
    backgroundColor: COLORS.primary,
    width: 90,
    borderRadius: 0,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    height: "100%",
    justifyContent: "center",
    padding: 0,
  },
});
