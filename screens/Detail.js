import React, { useEffect, useState } from "react";

import { Container } from "../components/Container";
import { ItemDetail } from "../components/ItemDetail";
import { Loader } from "../components/Loader";
import { Screen } from "./Screen";
import { TextComponent } from "../components/TextComponent";
import { getProductById } from "../firebase/client";

export const Detail = ({ route, navigation }) => {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const waitForData = async (id) => {
      if (id) setProduct(await getProductById(id));
      else setProduct(null);
      setLoading(false);
    };
    waitForData(id);
  }, [id]);

  return (
    <Screen>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          {!product ? (
            <TextComponent>Producto no encontrado.</TextComponent>
          ) : (
            <ItemDetail product={product} navigation={navigation} />
          )}
        </Container>
      )}
    </Screen>
  );
};
