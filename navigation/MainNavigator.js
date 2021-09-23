import { AuthNavigator } from "./AuthNavigator";
import COLORS from "../constants/colors";
import { Loader } from "../components/Loader";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { TabNavigator } from "./TabNavigator";
import { useSelector } from "react-redux";

export const MainNavigator = () => {
  const userId = useSelector((state) => state.auth.userId);
  const status = useSelector((state) => state.auth.status);

  return (
    <>
      <NavigationContainer>
        {status === "loading" ? (
          <Loader style={{ backgroundColor: COLORS.background }} />
        ) : userId ? (
          <TabNavigator />
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
    </>
  );
};
