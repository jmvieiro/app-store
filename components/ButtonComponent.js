import { StyleSheet, TouchableOpacity, View } from "react-native";

import COLORS from "../constants/colors";
import React from "react";
import { TextComponent } from "./TextComponent";

export const ButtonComponent = (props) => {
  return (
    <TouchableOpacity onPress={props.handleClick}>
      <View style={{ ...styles.button, ...props.style }}>
        <TextComponent style={styles.text}>{props.title}</TextComponent>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    color: "white",
    padding: 10,
    borderRadius: 6,
    width: 70,
    marginLeft: 2,
    backgroundColor: COLORS.success,
    borderWidth: 1,
    borderColor: COLORS.header,
  },
  text: {
    padding: 5,
    paddingTop: 5,
    textAlign: "center",
    fontFamily: "Roboto-Bold",
  },
});
