import { Image, View } from "react-native";

import { Card } from "../Card";
import { ItemCounter } from "../ItemCounter";
import React from "react";
import { TextComponent } from "../TextComponent";
import accounting from "accounting";

export const ListItemCheckout = React.memo(
  ({ item }) => {
    return (
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Card style={{ height: "100%" }}>
          <View
            style={{
              padding: 5,
              flexDirection: "column",
              width: "100%",
            }}
          >
            <View style={{ flex: 1, marginBottom: 10 }}>
              <TextComponent style={{ fontSize: 18 }}>
                {item.product.title}
              </TextComponent>
            </View>
            <View style={{ flexDirection: "row", padding: 5 }}>
              <View
                style={{
                  flex: 0.5,
                  paddingRight: 10,
                }}
              >
                <Image
                  style={{
                    flex: 1,
                    height: 100,
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
                <TextComponent style={{ fontSize: 15 }}>
                  {accounting.formatMoney(item.product.price, "$")} por unidad
                </TextComponent>
                <TextComponent style={{ fontSize: 20 }}>
                  {accounting.formatMoney(item.product.price * item.qty, "$")}{" "}
                  total
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
