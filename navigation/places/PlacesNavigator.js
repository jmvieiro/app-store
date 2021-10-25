import COLORS from "../../constants/colors";
import { Map } from "../../screens/places/Map";
import { NewPlace } from "../../screens/places/NewPlace";
import { PlaceDetail } from "../../screens/places/PlaceDetail";
import { PlaceList } from "../../screens/places/PlaceList";
import ROUTES from "../../constants/routes";
import React from "react";
import { TextTitle } from "../../components/TextTitle";
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
    <Stack.Navigator
      screenOptions={options}
      initialRouteName={ROUTES.PLACE_LIST}
    >
      <Stack.Screen
        name={ROUTES.PLACE_LIST}
        component={PlaceList}
        options={{
          headerTitle: () => <TextTitle>Direcciones</TextTitle>,
        }}
      />
      <Stack.Screen
        name={ROUTES.NEW_PLACE}
        component={NewPlace}
        options={{
          headerBackTitle: "Direcciones",
          headerTitle: () => <TextTitle>Nueva</TextTitle>,
        }}
      />
      <Stack.Screen
        name={ROUTES.PLACE_DETAIL}
        component={PlaceDetail}
        options={{
          headerBackTitle: "Direcciones",
          headerTitle: () => <TextTitle>Detalle</TextTitle>,
        }}
      />
      <Stack.Screen
        name={ROUTES.MAP}
        component={Map}
        options={{
          headerBackTitle: "Nueva",
          headerTitle: () => <TextTitle>Vista del mapa</TextTitle>,
        }}
      />
    </Stack.Navigator>
  );
};
