import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ButtonComponent } from "./ButtonComponent";
import COLORS from "../constants/colors";
import { ItemCounter } from "./ItemCounter";
import ROUTES from "../constants/routes";
import { TextComponent } from "./TextComponent";
import accounting from "accounting";
import { addProduct_ } from "../store/actions/cart.actions";
import { selectCategory } from "../store/actions/category.actions";

export const ItemDetail = ({ product, navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const [confirm, setConfirm] = useState(false);
  function onAdd(c) {
    dispatch(addProduct_(product, c, false));
    setConfirm(true);
  }
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
              top: 45,
              right: 25,
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
                  navigation.navigate(ROUTES.CARRITO);
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
