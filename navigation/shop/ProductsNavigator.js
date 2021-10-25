import COLORS from "../../constants/colors";
import { Detail } from "../../screens/shop/Detail";
import { Home } from "../../screens/shop/Home";
import { LogoTitle } from "../../components/LogoTitle";
import { Products } from "../../screens/shop/Products";
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

export const ProductsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={options} initialRouteName={ROUTES.HOME}>
      <Stack.Screen
        name={ROUTES.HOME}
        component={Home}
        options={{
          headerLeft: () => <LogoTitle />,
          headerTitle: () => <TextTitle>Inicio</TextTitle>,
        }}
      />
      <Stack.Screen
        name={ROUTES.PRODUCTS}
        component={Products}
        options={{
          headerTitle: () => <TextTitle>Productos</TextTitle>,
          headerBackTitle: "Inicio",
        }}
      />
      <Stack.Screen
        name={ROUTES.PRODUCT_DETAIL}
        component={Detail}
        options={{
          headerTitle: () => <TextTitle>Detalle</TextTitle>,
          headerBackTitle: "Productos",
        }}
      />
    </Stack.Navigator>
  );
};
