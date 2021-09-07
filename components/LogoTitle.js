import { Image } from "react-native";
import React from "react";
import { View } from "react-native";

export const LogoTitle = () => {
  return (
    <View style={{ flex: 0 }}>
      <Image
        style={{
          height: 30,
          width: 100,
          resizeMode: "contain",
        }}
        source={require("../assets/images/logo.png")}
      />
    </View>
  );
};
