import COLORS from "../../constants/colors";
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
          headerTitle: () => (
            <TextComponent style={styles.title}>Mis órdenes</TextComponent>
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
