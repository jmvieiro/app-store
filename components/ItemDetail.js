import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";

import { ButtonComponent } from "./ButtonComponent";
import COLORS from "../constants/colors";
import { CartContext } from "../context/CartContext";
import { ItemCounter } from "./ItemCounter";
import ROUTES from "../constants/routes";
import { TextComponent } from "./TextComponent";
import accounting from "accounting";
import { useDispatch } from "react-redux";

export const ItemDetail = ({ product, navigation }) => {
  const dispatch = useDispatch();
  const { cart, addItem } = useContext(CartContext);
  const [confirm, setConfirm] = useState(false);
  function onAdd(c) {
    setConfirm(true);
    addItem(product, c, false);
  }
  let productInCart = cart.find((e) => e.product.id === product.id);
  let remainingStock = productInCart
    ? product.stock - productInCart.qty
    : product.stock;
  return (
    <>
      <View style={{ flex: 0.5, flexDirection: "column" }}>
        <TextComponent>ID #{product.id}</TextComponent>
        <Image
          style={{
            flex: 1,
            width: 290,
            resizeMode: "contain",
            alignSelf: "center",
          }}
          source={{ uri: product.img }}
        />
        {productInCart && (
          <View
            style={{
              position: "absolute",
              top: 45,
              right: 5,
              width: 62,
              borderRadius: 6,
              backgroundColor: COLORS.background,
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
                fontSize: 12,
              }}
            >
              en carrito
            </Text>
          </View>
        )}
      </View>
      <View style={{ flex: 0.5 }}>
        <TextComponent>{product.title}</TextComponent>
        <TextComponent>
          {accounting.formatMoney(product.price, "$")} x un.
        </TextComponent>
        <TextComponent>{product.description}</TextComponent>
        <TextComponent>
          Stock disponible: {remainingStock}{" "}
          {remainingStock === 1 ? "unidad" : "unidades"}
        </TextComponent>
        {confirm || remainingStock === 0 ? (
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <View style={{ flex: 0.5 }}>
              <ButtonComponent
                title={`Seguir comprando`}
                style={{ ...styles.button, ...styles.buttonContinue }}
                handleClick={() => {
                  dispatch(selectCategory({}));
                  navigation.navigate(ROUTES.PRODUCTS);
                }}
              />
            </View>
            <View style={{ flex: 0.5, marginLeft: 2 }}>
              <ButtonComponent
                style={{ ...styles.button }}
                title={`Checkout`}
                handleClick={() => {
                  navigation.navigate(ROUTES.CHECKOUT);
                }}
              />
            </View>
          </View>
        ) : (
          <ItemCounter product={product} onAdd={onAdd} />
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
