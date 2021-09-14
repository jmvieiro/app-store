import { Card } from "../Card";
import { Image } from "react-native";
import ROUTES from "../../constants/routes";
import React from "react";
import { TextComponent } from "../TextComponent";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import accounting from "accounting";
import { selectProduct } from "../../store/actions/product.actions";
import { useDispatch } from "react-redux";

export const ListItem = ({ item, navigation }) => {
  const dispatch = useDispatch();
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Card style={{ height: "100%" }}>
        <TouchableOpacity
          style={{ width: "100%" }}
          onPress={() => {
            dispatch(selectProduct(item));
            navigation.navigate(ROUTES.DETAIL);
          }}
        >
          <View
            style={{
              padding: 15,
              flexDirection: "row",
            }}
          >
            <Image
              style={{
                flex: 1,
                height: 90,
                resizeMode: "contain",
              }}
              source={{ uri: item.img }}
            />
            <View style={{ flex: 1 }}>
              <TextComponent>{item.title}</TextComponent>
              <TextComponent>
                {accounting.formatMoney(item.price, "$")} x un.
              </TextComponent>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    </View>
  );
};
