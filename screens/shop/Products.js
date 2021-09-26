import React, { useEffect, useState } from "react";
import {
  _getProducts,
  _getProductsByCategory,
  filterProducts,
} from "../../store/actions/product.actions";
import { useDispatch, useSelector } from "react-redux";

import { Container } from "../../components/Container";
import { List } from "../../components/List/List";
import { Loader } from "../../components/Loader";
import { Screen } from "../Screen";
import { TextComponent } from "../../components/TextComponent";

export const Products = ({ navigation }) => {
  const list = useSelector((state) => state.products.list);
  const filteredProducts = useSelector((state) => state.products.filtered);
  const status = useSelector((state) => state.products.status);
  const selectedCategory = useSelector((state) => state.categories.selected);
  const dispatch = useDispatch();

  useEffect(() => {
    const waitForData = async () => {
      if (selectedCategory && selectedCategory.id) {
        dispatch(filterProducts(selectedCategory));
      }
    };
    waitForData();
  }, [selectedCategory]);

  return (
    <Screen>
      {status === "loading" ? (
        <Loader />
      ) : (
        <Container
          style={{
            width: "100%",
          }}
        >
          <TextComponent
            style={{
              marginBottom: 23,
              fontSize: 22,
              alignSelf: "flex-start",
            }}
          >
            {selectedCategory.name}
          </TextComponent>
          {(selectedCategory &&
            selectedCategory.id &&
            (!filteredProducts || filteredProducts.length === 0)) ||
          ((!selectedCategory || !selectedCategory.id) &&
            (!list || list.length === 0)) ? (
            <TextComponent
              style={{
                alignSelf: "flex-start",
              }}
            >
              No hay productos en esta categoría.
            </TextComponent>
          ) : (
            <List
              data={
                selectedCategory && selectedCategory.id
                  ? filteredProducts
                  : list
              }
              navigation={navigation}
            />
          )}
        </Container>
      )}
    </Screen>
  );
};
