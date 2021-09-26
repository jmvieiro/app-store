import { Container } from "../../components/Container";
import React from "react";
import { Screen } from "../Screen";
import { TextComponent } from "../../components/TextComponent";
import { useSelector } from "react-redux";

export const OrderDetail = () => {
  const order = useSelector((state) => state.orders.selected);

  return (
    <Screen>
      <Container>
        <TextComponent>Orden {JSON.stringify(order)}</TextComponent>
      </Container>
    </Screen>
  );
};
