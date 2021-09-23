import { Text, TouchableOpacity, View } from "react-native";

import React from "react";
import { removeProduct_ } from "../../store/actions/cart.actions";
import { useDispatch } from "react-redux";

export const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <View>
      <Text style={{ color: "white" }}>{item.title}</Text>
      <View>
        <TouchableOpacity onPress={() => dispatch(removeProduct_(item.id))}>
          <Text style={{ color: "white" }}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
