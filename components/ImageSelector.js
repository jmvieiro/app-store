import * as ImagePicker from "expo-image-picker";

import { Alert, Image, StyleSheet, View } from "react-native";
import React, { useState } from "react";

import { ButtonComponent } from "./ButtonComponent";
import COLORS from "../constants/colors";
import { TextComponent } from "./TextComponent";

export const ImageSelector = (props) => {
  const [pickedUri, setPickedUri] = useState();

  const verifyPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permisos insuficientes",
        "Necesita dar permisos de la cámara para usar la aplicación",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  const handleTakeImage = async () => {
    const isCameraOk = await verifyPermissions();
    if (!isCameraOk) return;

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
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
