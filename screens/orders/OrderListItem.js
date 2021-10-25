import { TouchableOpacity, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { Card } from "../../components/Card";
import ROUTES from "../../constants/routes";
import React from "react";
import { TextComponent } from "../../components/TextComponent";
import accounting from "accounting";
import { selectOrder } from "../../store/actions/order.actions";
import { toFullDate } from "../../utils/helper";
import { useDispatch } from "react-redux";

export const OrderListItem = ({ item, navigation }) => {
  const dispatch = useDispatch();
  return (
    <Card style={{ flex: 0.5 }}>
      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={() => {
          dispatch(selectOrder(item));
          navigation.navigate(ROUTES.ORDER_DETAIL);
        }}
      >
        <View
          style={{
            padding: 8,
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1 }}>
            <TextComponent>Fecha: {toFullDate(item.ts_created)}</TextComponent>
            <TextComponent>Orden #: {item.id}</TextComponent>
            <TextComponent>
              Total: {accounting.formatMoney(item.total, "$")}
            </TextComponent>
            <TextComponent>Ítems total: {item.totalItems}</TextComponent>
          </View>
          <View
            style={{
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
