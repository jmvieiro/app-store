import { ActivityIndicator, StyleSheet, View } from "react-native";

import React from "react";

export const Loader = () => {

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
  },
});
