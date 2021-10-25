import COLORS from "../../constants/colors";
import { Logout } from "../../screens/user/Logout";
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

export const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={options}
      initialRouteName={ROUTES.LOGOUT}
    >
      <Stack.Screen
        name={ROUTES.LOGOUT}
        component={Logout}
        options={{
          headerTitle: () => <TextTitle>Configuración</TextTitle>,
        }}
      />
    </Stack.Navigator>
  );
};
