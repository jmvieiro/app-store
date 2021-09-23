import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container } from "../../components/Container";
import { List } from "../../components/List/List";
import { Loader } from "../../components/Loader";
import { Screen } from "../Screen";
import { TextComponent } from "../../components/TextComponent";
import { filterProducts } from "../../store/actions/product.actions";

export const Products = ({ navigation }) => {
  const filteredProducts = useSelector((state) => state.products.filtered);
  const selectedCategory = useSelector((state) => state.categories.selected);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const waitForData = async () => {
      dispatch(filterProducts(selectedCategory));
      setLoading(false);
    };
    waitForData();
  }, [selectedCategory]);

  return (
    <Screen>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <TextComponent style={{ marginBottom: 30 }}>
            {selectedCategory.name}
          </TextComponent>

          {!filteredProducts || filteredProducts.length === 0 ? (
            <TextComponent>No hay productos para mostrar.</TextComponent>
          ) : (
            <List data={filteredProducts} navigation={navigation} />
          )}
        </Container>
      )}
    </Screen>
  );
};
