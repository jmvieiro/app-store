import React, { useContext, useEffect, useState } from "react";

import { Container } from "../components/Container";
import { List } from "../components/List/List";
import { Loader } from "../components/Loader";
import { Screen } from "./Screen";
import { ShopContext } from "../context/ShopContext";

export const Products = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const { products } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    const waitForData = async () => {
      setFilterProducts(products);
      setLoading(false);
    };
    waitForData();
  }, []);
  return (
    <Screen>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <List data={filterProducts} navigation={navigation} />
        </Container>
      )}
    </Screen>
  );
};
