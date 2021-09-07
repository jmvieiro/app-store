import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import COLORS from "../constants/colors";
import React from "react";

export const TextComponent = (props) => {
  return (
    <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.white,
    fontSize: 17,
    paddingTop: 10,
  },
});
