import { useDispatch, useSelector } from "react-redux";

import { AuthWrapper } from "./AuthWrapper";
import { ItemMenu } from "../../components/ItemMenu";
import ROUTES from "../../constants/routes";
import React from "react";
import { StyleSheet } from "react-native";
import { logOut } from "../../store/actions/auth.actions";

export const Logout = ({ navigation }) => {
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(logOut());
  };

  return (
    <AuthWrapper title={`¡Hola ${email}!`}>
      <ItemMenu
        text={"Carrito"}
        action={() => {
          navigation.navigate(ROUTES.CARRITO);
        }}
      />
      <ItemMenu
        text={"Mis órdenes"}
        action={() => {
          navigation.navigate(ROUTES.MIS_ORDENES);
        }}
      />
      <ItemMenu
        text={"Mis direcciones"}
        action={() => {
          navigation.navigate(ROUTES.DIRECCIONES);
        }}
      />
      <ItemMenu text={"Cerrar sesión"} action={handleSignOut} />
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 0,
    width: "100%",
    marginBottom: 40,
    marginTop: 20,
  },
});
