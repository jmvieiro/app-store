import { Contact } from "../screens/Contact";
import { NavigationContainer } from "@react-navigation/native";
import { ProductsNavigator } from "./ProductsNavigator";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <NavigationContainer initialRouteName="ProductsNavigator">
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Main" component={ProductsNavigator} />
        <Tab.Screen name="Contact" component={Contact} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
