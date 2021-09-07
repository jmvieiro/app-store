import { AntDesign } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import { Contact } from "../screens/Contact";
import { NavigationContainer } from "@react-navigation/native";
import { ProductsNavigator } from "./ProductsNavigator";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <NavigationContainer initialRouteName="ProductsNavigator">
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Main") {
              iconName = focused ? "appstore1" : "appstore-o";
            } else if (route.name === "Contact") {
              iconName = focused ? "infocirlce" : "infocirlceo";
            }
            return <AntDesign name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: COLORS.background,
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Main"
          component={ProductsNavigator}
          options={{ title: "Productos" }}
        />
        <Tab.Screen
          name="Contact"
          component={Contact}
          options={{ title: "Contacto" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
