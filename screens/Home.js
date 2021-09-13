import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import COLORS from "../constants/colors";
import { CarouselComponent } from "../components/CarouselComponent";
import { Category } from "../components/Category";
import { Container } from "../components/Container";
import { Loader } from "../components/Loader";
import { ShopContext } from "../context/ShopContext";
import { TextComponent } from "../components/TextComponent";

export const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [_categories, setCategories] = useState(true);
  const { categories } = useContext(ShopContext);
  useEffect(() => {
    setLoading(true);
    const waitForData = async () => {
      setCategories([{ name: "Todos los productos", id: null }, ...categories]);
      setLoading(false);
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
      {loading ? (
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
                  marginLeft: 35
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
                data={_categories}
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
