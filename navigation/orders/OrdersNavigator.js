import COLORS from "../../constants/colors";
import { OrderDetail } from "../../screens/orders/OrderDetail";
import { Orders } from "../../screens/orders/Orders";
import ROUTES from "../../constants/routes";
import React from "react";
import { TextTitle } from "../../components/TextTitle";
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
    <Stack.Navigator screenOptions={options} initialRouteName={ROUTES.ORDERS}>
      <Stack.Screen
        name={ROUTES.ORDERS}
        component={Orders}
        options={{
          headerTitle: () => <TextTitle>Mis órdenes</TextTitle>,
        }}
      />
      <Stack.Screen
        name={ROUTES.ORDER_DETAIL}
        component={OrderDetail}
        options={{
          headerTitle: () => <TextTitle>Orden</TextTitle>,
          headerBackTitle: "Mis órdenes",
        }}
      />
    </Stack.Navigator>
  );
};
