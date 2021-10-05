import { StyleSheet, Text, View } from "react-native";

import COLORS from "../constants/colors";
import { CheckoutNavigator } from "./cart/CheckoutNavigator";
import { Ionicons } from "@expo/vector-icons";
import { LogoTitle } from "../components/LogoTitle";
import { OrdersNavigator } from "./orders/OrdersNavigator";
import { PlacesNavigator } from "./places/PlacesNavigator";
import { ProductsNavigator } from "./shop/ProductsNavigator";
import ROUTES from "../constants/routes";
import React from "react";
import { TextComponent } from "../components/TextComponent";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const email = useSelector((state) => state.auth.email);
  const cartSize = useSelector((state) => state.cart.cartSize);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: COLORS.header,
        },
        headerTintColor: COLORS.primary,
        headerTitleStyle: {
          color: COLORS.primary,
        },
        tabBarShowLabel: false,
        tabBarStyle: { ...styles.tabBar },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === ROUTES.TIENDA) {
            iconName = focused ? "home-sharp" : "home-outline";
          } else if (route.name === ROUTES.CARRITO) {
            iconName = focused ? "cart-sharp" : "cart-outline";
          } else if (route.name === ROUTES.MIS_ORDENES) {
            iconName = focused
              ? "reorder-three-sharp"
              : "reorder-three-outline";
          } else if (route.name === ROUTES.DIRECCIONES) {
            iconName = focused ? "location" : "location-outline";
          }
          return (
            <View style={styles.item}>
              <Ionicons name={iconName} size={size} color={color} />
              {route.name === ROUTES.CARRITO && (
                <View
                  style={{
                    position: "absolute",
                    top: 6,
                    right: -19,
                    width: 26,
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "flex-start",
                      fontWeight: "800",
                      fontSize: 14,
                    }}
                  >
                    {cartSize}
                  </Text>
                </View>
              )}
              <Text>{route.name}</Text>
            </View>
          );
        },
        tabBarActiveTintColor: COLORS.background,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name={ROUTES.TIENDA}
        component={ProductsNavigator}
        options={{
          headerTitle: () => <TextComponent></TextComponent>,
          headerRight: () => (
            <TextComponent style={styles.email}>{email}</TextComponent>
          ),
          headerLeft: () => <LogoTitle />,
        }}
      />
      <Tab.Screen
        name={ROUTES.CARRITO}
        component={CheckoutNavigator}
        options={{
          headerTitle: () => <TextComponent></TextComponent>,
          headerRight: () => (
            <TextComponent style={styles.email}>{email}</TextComponent>
          ),
          headerLeft: () => <LogoTitle />,
        }}
      />
      <Tab.Screen
        name={ROUTES.MIS_ORDENES}
        component={OrdersNavigator}
        options={{
          headerTitle: () => <TextComponent></TextComponent>,
          headerRight: () => (
            <TextComponent style={styles.email}>{email}</TextComponent>
          ),
          headerLeft: () => <LogoTitle />,
        }}
      />
      <Tab.Screen
        name={ROUTES.DIRECCIONES}
        component={PlacesNavigator}
        options={{
          headerTitle: () => <TextComponent></TextComponent>,
          headerRight: () => (
            <TextComponent style={styles.email}>{email}</TextComponent>
          ),
          headerLeft: () => <LogoTitle />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.header,
  },
  item: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  email: {
    color: COLORS.background,
    paddingRight: 10,
    fontSize: 15,
  },
});
