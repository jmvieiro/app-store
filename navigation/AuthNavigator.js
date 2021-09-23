import COLORS from "../constants/colors";
import { Login } from "../screens/user/Login";
import { LogoTitle } from "../components/LogoTitle";
import React from "react";
import { Register } from "../screens/user/Register";
import { StyleSheet } from "react-native";
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

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={options} initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: () => <LogoTitle />,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerTitle: () => <LogoTitle />,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
