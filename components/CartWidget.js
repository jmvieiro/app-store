import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import { CartContext } from "../context/CartContext";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const CartWidget = () => {
  const { cartSize } = useContext(CartContext);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Checkout");
      }}
    >
      <View style={{ marginRight: 10 }}>
        <AntDesign name="shoppingcart" size={40} color={COLORS.background} />
        <View
          style={{
            position: "absolute",
            top: 8,
            right: 5,
            width: 23,
          }}
        >
          <Text
            style={{
              color: COLORS.background,
              alignSelf: "center",
              paddingTop: 1,
              fontWeight: "800",
              fontSize: 12,
            }}
          >
            {cartSize}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
