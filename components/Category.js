import COLORS from "../constants/colors";
import { Card } from "./Card";
import ROUTES from "../constants/routes";
import React from "react";
import { StyleSheet } from "react-native";
import { TextComponent } from "./TextComponent";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";

export const Category = ({ item, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.gridItem, { backgroundColor: COLORS.header }]}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            navigation.navigate(ROUTES.PRODUCTS, { id: item.id, name: item.name });
          }}
        >
          <TextComponent style={{ color: COLORS.background }}>
            {item.name}
          </TextComponent>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    margin: 35,
    // borderWidth: 1,
    // borderColor: "red",
    // borderStyle: "solid",
    height: 80,
    alignItems: "center",
  },
  gridItem: {
    flex: 1,
    borderRadius: 6,
    width: 120,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    justifyContent: "flex-start",
    paddingLeft: 8,
    paddingRight: 8,
  },
});
