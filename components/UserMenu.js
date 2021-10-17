import COLORS from "../constants/colors";
import React from "react";
import { StyleSheet } from "react-native";
import { TextComponent } from "./TextComponent";
import { View } from "react-native";
import { useSelector } from "react-redux";

export const UserMenu = () => {
  const email = useSelector((state) => state.auth.email);
  return <TextComponent style={styles.email}>{email}</TextComponent>;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    margin: 35,
    height: 80,
    alignItems: "center",
  },
  email: {
    color: COLORS.background,
    paddingRight: 10,
    fontSize: 15,
  },
});
