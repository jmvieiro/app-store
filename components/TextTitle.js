import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import COLORS from "../constants/colors";
import React from "react";

export const TextTitle = (props) => {
  return (
    <Text style={{ ...styles.text, ...props.style }} numberOfLines={2}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto-Medium",
    color: COLORS.primary,
    fontSize: 20,
    paddingTop: 0,
    fontWeight: "600",
  },
});
