import { ActivityIndicator, StyleSheet, View } from "react-native";

import COLORS from "../constants/colors";
import React from "react";

export const Loader = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <ActivityIndicator size="large" color={COLORS.header} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: COLORS.background,
  },
});
