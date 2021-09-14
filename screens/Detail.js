import { Container } from "../components/Container";
import { ItemDetail } from "../components/ItemDetail";
import React from "react";
import { Screen } from "./Screen";
import { TextComponent } from "../components/TextComponent";
import { useSelector } from "react-redux";

export const Detail = ({ navigation }) => {
  const selectedProduct = useSelector((state) => state.products.selected);
  return (
    <Screen>
      <Container>
        {!selectedProduct ? (
          <TextComponent>Producto no encontrado.</TextComponent>
        ) : (
          <ItemDetail product={selectedProduct} navigation={navigation} />
        )}
      </Container>
    </Screen>
  );
};
