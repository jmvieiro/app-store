import { ActivityIndicator, StyleSheet, View } from "react-native";

import React from "react";

export const Loader = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
  },
});
