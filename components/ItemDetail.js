import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import COLORS from "../constants/colors";
import { ItemCounter } from "./ItemCounter";
import { TextComponent } from "./TextComponent";
import accounting from "accounting";
import { addProduct_ } from "../store/actions/cart.actions";

export const ItemDetail = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  let productInCart = cart.find((e) => e.product.id === product.id);
  let remainingStock = productInCart
    ? parseInt(product.stock) - parseInt(productInCart.qty)
    : product.stock;
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <View>
          <TextComponent
            style={{
              marginBottom: 10,
            }}
          >
            ID #{product.id}
          </TextComponent>
          <View
            style={{
              flex: 1,
              shadowColor: COLORS.white,
              shadowOffset: { width: 0, height: 1 },
              shadowRadius: 6,
              shadowOpacity: 0.5,
            }}
          >
            <Image
              style={{
                flex: 1,
                width: 280,
                resizeMode: "contain",
              }}
              source={{ uri: product.img }}
            />
          </View>
        </View>
        {productInCart && (
          <View
            style={{
              position: "absolute",
              top: 60,
              right: 6,
              width: 70,
              borderRadius: 6,
              backgroundColor: COLORS.background,
              padding: 3,
              paddingTop: 1,
              paddingBottom: 3,
            }}
          >
            <Text
              style={{
                color: COLORS.header,
                alignSelf: "center",
                paddingTop: 1,
                fontWeight: "700",
                fontSize: 15,
              }}
            >
              en carrito
            </Text>
          </View>
        )}
      </View>
      <View style={{ flex: 1 }}>
        <TextComponent>{product.title}</TextComponent>
        <TextComponent>
          {accounting.formatMoney(product.price, "$")} x un.
        </TextComponent>
        <TextComponent>{product.description}</TextComponent>
        <TextComponent style={{ marginBottom: 20 }}>
          Stock disponible: {remainingStock}{" "}
          {remainingStock === 1 ? "unidad" : "unidades"}
        </TextComponent>
        {remainingStock !== 0 && (
          <ItemCounter
            product={product}
            onAdd={(c) => {
              dispatch(addProduct_(product, c, false));
            }}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 0,
    width: "100%",
    marginLeft: 1,
    borderTopWidth: 1,
    borderTopColor: COLORS.header,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.header,
    borderRightWidth: 1,
    borderRightColor: COLORS.header,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.header,
  },
  buttonContinue: {
    backgroundColor: COLORS.primary,
  },
});
