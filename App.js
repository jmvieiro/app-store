import AppLoading from "expo-app-loading";
import { MainNavigator } from "./navigation/MainNavigator";
import { Provider } from "react-redux";
import React from "react";
import { StyleSheet } from "react-native";
import { init } from "./db/db";
import store from "./store";
import { useFonts } from "expo-font";

init()
  .then(() => console.log("Database initialized"))
  .catch((err) => {
    console.log("Database failed to connect");
    console.log(err.message);
  });

export default function App() {
  const [loaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto/Roboto-Black.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto/Roboto-Light.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  });
  if (!loaded) return <AppLoading />;

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
