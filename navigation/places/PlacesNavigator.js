import COLORS from "../../constants/colors";
import { NewPlace } from "../../screens/places/NewPlace";
import { PlaceList } from "../../screens/places/PlaceList";
import ROUTES from "../../constants/routes";
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

export const PlacesNavigator = () => {
  return (
    <Stack.Navigator screenOptions={options} initialRouteName={ROUTES.PLACE_LIST}>
      <Stack.Screen
        name={ROUTES.PLACE_LIST}
        component={PlaceList}
        options={{
          headerTitle: () => (
            <TextComponent style={styles.title}>Direcciones</TextComponent>
          ),
        }}
      />

      <Stack.Screen
        name={ROUTES.NEW_PLACE}
        component={NewPlace}
        options={{
          headerBackTitle: "Direcciones",
          headerTitle: () => <TextComponent></TextComponent>,
          headerRight: () => (
            <TextComponent style={styles.title}>Nueva dirección</TextComponent>
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
