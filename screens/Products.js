import React, { useContext, useEffect, useState } from "react";
import { getCategoryById, getProductsByCategory } from "../firebase/client";

import { Container } from "../components/Container";
import { List } from "../components/List/List";
import { Loader } from "../components/Loader";
import { Screen } from "./Screen";
import { ShopContext } from "../context/ShopContext";
import { TextComponent } from "../components/TextComponent";

export const Products = ({ route, navigation }) => {
  const { categories, products } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id, name } = route.params;

  useEffect(() => {
    setLoading(true);
    const waitForData = async (id) => {
      let cat = null;
      if (id) {
        cat = categories.find((c) => c.id === id);
        if (!cat) cat = await getCategoryById(id);
        let prods = products.filter((p) => p.category === id);
        if (prods.length !== 0) setFilterProducts(prods);
        else setFilterProducts(await getProductsByCategory(id));
      } else setFilterProducts(products);
      setCategory(cat);
      setLoading(false);
    };
    waitForData(id);
  }, [id, categories, products]);

  return (
    <Screen>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          {!filterProducts || filterProducts.length === 0 ? (
            <TextComponent>No hay productos para mostrar.</TextComponent>
          ) : (
            <>
              <TextComponent style={{marginBottom: 30}}>{name}</TextComponent>
              <List data={filterProducts} navigation={navigation} />
            </>
          )}
        </Container>
      )}
    </Screen>
  );
};
