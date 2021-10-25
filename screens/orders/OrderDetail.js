import { Container } from "../../components/Container";
import React from "react";
import { Screen } from "../Screen";
import { TextComponent } from "../../components/TextComponent";
import { View } from "react-native";
import accounting from "accounting";
import { toFullDate } from "../../utils/helper";
import { useSelector } from "react-redux";

export const OrderDetail = () => {
  const order = useSelector((state) => state.orders.selected);
  return (
    <Screen>
      <Container
        style={{
          alignItems: "flex-start",
          alignSelf: "flex-start",
        }}
      >
        <TextComponent>ID #{order.id}</TextComponent>
        <TextComponent>Fecha: {toFullDate(order.ts_created)}</TextComponent>
        <TextComponent>
          Total: {accounting.formatMoney(order.total, "$")}
        </TextComponent>
        <TextComponent>Detalle:</TextComponent>
        <View style={{ paddingLeft: 20 }}>
          {order.detail.map((item) => {
            return (
              <TextComponent>
                Cantidad: {item.qty} -> {item.title} ({item.idProduct})
              </TextComponent>
            );
          })}
        </View>
      </Container>
    </Screen>
  );
};
