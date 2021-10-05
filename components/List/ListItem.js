import { Image, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { Card } from "../Card";
import ROUTES from "../../constants/routes";
import React from "react";
import { TextComponent } from "../TextComponent";
import { TouchableOpacity } from "react-native";
import accounting from "accounting";
import { selectProduct } from "../../store/actions/product.actions";
import { useDispatch } from "react-redux";

export const ListItem = ({ item, navigation }) => {
  const dispatch = useDispatch();
  return (
    <Card style={{ flex: 0.5 }}>
      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={() => {
          dispatch(selectProduct(item));
          navigation.navigate(ROUTES.PRODUCT_DETAIL);
        }}
      >
        <View
          style={{
            padding: 8,
            flexDirection: "row",
          }}
        >
          <Image
            style={{
              height: 80,
              flex: 0.3,
              resizeMode: "contain",
            }}
            source={{ uri: item.img }}
          />
          <View style={{ flex: 0.5 }}>
            <TextComponent>{item.title}</TextComponent>
            <TextComponent>
              {accounting.formatMoney(item.price, "$")} x un.1
            </TextComponent>
          </View>
          <View
            style={{
              flex: 0.2,
              alignItems: "flex-end",
              alignSelf: "center",
            }}
          >
            <AntDesign name="right" size={18} color={COLORS.header} />
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};
