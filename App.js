import { StyleSheet, Text, View } from "react-native";

import AppLoading from "expo-app-loading";
import { CartProvider } from "./context/CartContext";
import { MainNavigator } from "./navigation/MainNavigator";
import React from "react";
import { ShopProvider } from "./context/ShopContext";
import { useFonts } from "expo-font";

export default function App() {
  return (
    <ShopProvider>
      <CartProvider>
        <MainNavigator />
      </CartProvider>
    </ShopProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
