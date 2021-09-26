import COLORS from "../../constants/colors";
import { Checkout } from "../../screens/cart/Checkout";
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

export const CheckoutNavigator = () => {
  return (
    <Stack.Navigator screenOptions={options} initialRouteName="Checkout">
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{
          headerTitle: () => <TextComponent></TextComponent>,
          headerRight: () => (
            <TextComponent style={styles.title}>
              Carrito de compras
            </TextComponent>
          ),
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
