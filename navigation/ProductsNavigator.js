import COLORS from "../constants/colors";
import { CartWidget } from "../components/CartWidget";
import { Checkout } from "../screens/Checkout";
import { Detail } from "../screens/Detail";
import { Home } from "../screens/Home";
import { LogoTitle } from "../components/LogoTitle";
import { Products } from "../screens/Products";
import React from "react";
import { StyleSheet } from "react-native";
import { TextComponent } from "../components/TextComponent";
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
    <Stack.Navigator screenOptions={options} initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => <TextComponent></TextComponent>,
          headerRight: () => <CartWidget />,
          headerLeft: () => <LogoTitle />,
        }}
      />
      <Stack.Screen
        name="Products"
        component={Products}
        options={{
          headerTitle: () => (
            <TextComponent style={styles.title}>Productos</TextComponent>
          ),
          headerBackTitle: "Inicio",
          headerRight: () => <CartWidget />,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerTitle: () => (
            <TextComponent style={styles.title}>
              Detalle del producto
            </TextComponent>
          ),
          headerBackTitle: "Productos",
          headerRight: () => <CartWidget />,
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{
          headerTitle: () => (
            <TextComponent style={styles.title}>Checkout</TextComponent>
          ),
          headerBackTitle: "Volver",
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
