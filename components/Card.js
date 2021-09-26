import { StyleSheet, View } from "react-native";

import COLORS from "../constants/colors";
import React from "react";

export const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background,
    borderBottomColor: COLORS.header,
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: "row",
  },
});
