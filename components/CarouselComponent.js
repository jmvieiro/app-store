import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import COLORS from "../constants/colors";
import Carousel from "react-native-snap-carousel";
import { TextComponent } from "./TextComponent";

export const CarouselComponent = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const DELAY = 7000;
  const carouselItems = [
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
    <View style={styles.carouselContainer}>
      <Carousel
        layout={"default"}
        autoplay={true}
        autoplayDelay={0}
        autoplayInterval={DELAY}
        loop={true}
        layoutCardOffset={40}
        ref={(ref) => (carousel = ref)}
        data={carouselItems}
        sliderWidth={300}
        itemWidth={300}
        renderItem={CarrouselItem}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
    </View>
  );
};

const CarrouselItem = ({ item }) => {
  return (
    <View style={styles.carouselItem}>
      <TextComponent style={{ fontSize: 30, color: COLORS.background }}>
        {item.title}
      </TextComponent>
      <TextComponent style={{ color: COLORS.background }}>
        {item.text}
      </TextComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  areaContainer: {
    backgroundColor: COLORS.background,
  },
  carouselContainer: {
    paddingTop: 25,
    flexDirection: "row",
    paddingLeft: 18,
  },
  carouselItem: {
    backgroundColor: COLORS.header,
    borderRadius: 5,
    height: 150,
    paddingHorizontal: 20,
    marginLeft: 15,
  },
});
