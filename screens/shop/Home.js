import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import COLORS from "../../constants/colors";
import { CarouselComponent } from "../../components/CarouselComponent";
import { Category } from "../../components/Category";
import { Container } from "../../components/Container";
import { Loader } from "../../components/Loader";
import { TextComponent } from "../../components/TextComponent";
import { _getCategories } from "../../store/actions/category.actions";
import { _getProducts } from "../../store/actions/product.actions";

export const Home = ({ navigation }) => {
  const list = useSelector((state) => state.products.list);
  const categories = useSelector((state) => state.categories.list);
  const status = useSelector((state) => state.categories.status);
  const dispatch = useDispatch();
  useEffect(() => {
    const waitForData = async () => {
      dispatch(_getCategories());
      dispatch(_getProducts());
    };
    waitForData();
  }, []);

  const _news = [
    {
      title: "Megaofertas",
      text: "Aprovechá los descuentos en indumentarias",
    },
    {
      title: "Fidelidad",
      text: "Bonificaciones para clientes frecuentes",
    },
    {
      title: "Recomendanos",
      text: "¡Y participá por increíbles premios!",
    },
    {
      title: "Soporte post-venta",
      text: "Para que disfrutes tu experiencia de compra",
    },
  ];
  return (
    <>
      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          <SafeAreaView style={styles.container}>
            <Container>
              <CarouselComponent
                navigation={navigation}
                carouselItems={_news}
              />
              <View
                style={{
                  alignSelf: "flex-start",
                  marginTop: 30,
                  marginLeft: 35,
                }}
              >
                <TextComponent
                  style={{
                    color: COLORS.header,
                    fontSize: 22,
                  }}
                >
                  Categorías
                </TextComponent>
              </View>

              <FlatList
                data={categories}
                renderItem={(data) => {
                  return <Category navigation={navigation} item={data.item} />;
                }}
                keyExtractor={(item) => item.id}
                numColumns={2}
              />
            </Container>
          </SafeAreaView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
