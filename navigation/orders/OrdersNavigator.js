import COLORS from "../../constants/colors";
import { OrderDetail } from "../../screens/orders/OrderDetail";
import { Orders } from "../../screens/orders/Orders";
import React from "react";
import { StyleSheet } from "react-native";
import { TextComponent } from "../../components/TextComponent";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const options = {
  headerStyle: {
    backgroundColor: COLORS.header,
  },
  headerTintColor: COLORS.primary,
  headerTitleStyle: {
    color: COLORS.primary,
  },
};

export const OrdersNavigator = () => {
  return (
    <Stack.Navigator screenOptions={options} initialRouteName="Orders">
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{
          headerTitle: () => <TextComponent></TextComponent>,
          headerRight: () => (
            <TextComponent style={styles.title}>Mis órdenes</TextComponent>
          ),
        }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={{
          headerRight: () => (
            <TextComponent style={styles.title}>
              Detalle de la orden
            </TextComponent>
          ),
          headerTitle: () => <TextComponent></TextComponent>,
          headerBackTitle: "Mis órdenes",
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  title: {
    color: COLORS.primary,
    fontSize: 22,
    paddingTop: 0,
    fontWeight: "600",
  },
});
