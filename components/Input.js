import { StyleSheet, TextInput } from "react-native";

import COLORS from "../constants/colors";
import React from "react";

export const Input = (props) => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    borderColor: COLORS.header,
    borderWidth: 1,
    borderStyle: "solid",
    padding: 5,
    height: 29,
    fontSize: 18,
    color: COLORS.white,
  },
});
