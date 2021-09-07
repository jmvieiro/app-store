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
    borderWidth: 0,
    borderColor: COLORS.header,
    marginTop: 15,
    alignItems: "center",
    alignSelf: "center",
    shadowColor: COLORS.white,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.115,
    elevation: 5,
    backgroundColor: COLORS.background,
    height: 120,
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
});
