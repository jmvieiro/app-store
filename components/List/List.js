import { FlatList } from "react-native";
import { ListItem } from "./ListItem";
import { ListItemCheckout } from "./ListItemCheckout";
import React from "react";

export const List = ({ data, navigation, checkout = false }) => {
  return (
    <FlatList
      data={data}
      renderItem={(data) => {
        return checkout ? (
          <ListItemCheckout navigation={navigation} item={data.item} />
        ) : (
          <ListItem navigation={navigation} item={data.item} />
        );
      }}
      keyExtractor={(item) => (checkout ? item.product.id : item.id)}
    />
  );
};
