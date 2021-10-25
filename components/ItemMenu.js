import { StyleSheet, TouchableOpacity, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import React from "react";
import { TextComponent } from "./TextComponent";

export const ItemMenu = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>
      <TouchableOpacity style={{ width: "100%" }} onPress={props.action}>
        <View style={{ padding: 8, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <TextComponent
              style={{
                color:
                  props.text === "Cerrar sesión" ? COLORS.error : COLORS.white,
              }}
            >
              {props.text}
            </TextComponent>
          </View>
          <View style={{ alignSelf: "center" }}>
            <AntDesign
              name="right"
              size={18}
              color={
                props.text === "Cerrar sesión" ? COLORS.error : COLORS.white
              }
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.background,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
  },
});
