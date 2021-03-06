import COLORS from "../../constants/colors";
import { Checkout } from "../../screens/cart/Checkout";
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

export const CheckoutNavigator = () => {
  return (
    <Stack.Navigator screenOptions={options} initialRouteName={ROUTES.CHECKOUT}>
      <Stack.Screen
        name={ROUTES.CHECKOUT}
        component={Checkout}
        options={{
          headerTitle: () => <TextTitle>Carrito de compras</TextTitle>,
        }}
      />
    </Stack.Navigator>
  );
};