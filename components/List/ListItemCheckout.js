import { Card } from "../Card";
import { Image } from "react-native";
import { ItemCounter } from "../ItemCounter";
import React from "react";
import { TextComponent } from "../TextComponent";
import { View } from "react-native";
import accounting from "accounting";

export const ListItemCheckout = React.memo(
  ({ item }) => {  
    let remainingStock = item.product.stock - item.qty;
    return (
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Card style={{ height: "100%" }}>
          <View
            style={{
              padding: 15,
              flexDirection: "column",
              width: "100%",
            }}
          >
            <View style={{ flex: 1, marginBottom: 10 }}>
              <TextComponent style={{ fontSize: 22 }}>
                {item.product.title}
              </TextComponent>
              <TextComponent style={{ fontSize: 11 }}>
                {remainingStock === 0
                  ? "Sin stock extra disponible."
                  : remainingStock === 1
                  ? `Aún queda ${remainingStock} unidad disponible.`
                  : `Aún quedan ${remainingStock} unidades disponibles.`}
              </TextComponent>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, paddingRight: 10, paddingVertical: 5 }}>
                <Image
                  style={{
                    flex: 1,
                    height: 90,
                    resizeMode: "contain",
                  }}
                  source={{ uri: item.product.img }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <ItemCounter
                  product={item.product}
                  initial={item.qty}
                  checkout={true}
                />
                <TextComponent>
                  {accounting.formatMoney(item.product.price, "$")} x un.
                </TextComponent>
                <TextComponent style={{ fontWeight: "600" }}>
                  {accounting.formatMoney(item.product.price * item.qty, "$")}{" "}
                  tot.
                </TextComponent>
              </View>
            </View>
          </View>
        </Card>
      </View>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.item.product === nextProps.item.product &&
      prevProps.item.qty === nextProps.item.qty
    );
  }
);
