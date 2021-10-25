import { Alert, StyleSheet } from "react-native";
import { FORM_INPUT_UPDATE, formReducer } from "./formReducer";
import React, { useCallback, useReducer } from "react";

import { AuthWrapper } from "./AuthWrapper";
import { ButtonComponent } from "../../components/ButtonComponent";
import { InputForm } from "../../components/InputForm";
import ROUTES from "../../constants/routes";
import { authenticate } from "../../store/actions/auth.actions";
import { useDispatch } from "react-redux";

export const Login = ({}) => {
  const dispatch = useDispatch();
  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    formIsValid: false,
  });
  const handleSignIn = () => {
    if (formState.formIsValid)
      dispatch(
        authenticate(
          formState.inputValues.email,
          formState.inputValues.password,
          "signInWithPassword"
        )
      );
    else
      Alert.alert(
        "Formulario inválido",
        "Usuario y/o contraseñas incorrectos.",
        [{ text: "Ok" }]
      );
  };

  const onInputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      formDispatch({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [formDispatch]
  );

  return (
    <AuthWrapper
      title={"Ingresar"}
      message={"¿No tenés cuenta?"}
      buttonText={"Registrarme"}
      buttonPath={ROUTES.REGISTER}
    >
      <InputForm
        id={"email"}
        label={"Email"}
        keyboardType="email-address"
        autoCapitalize="none"
        errorText={"Ingresá un email válido para loguearte."}
        placeholder={"Email"}
        maxLength={40}
        required
        email
        onInputChange={onInputChangeHandler}
      />
      <InputForm
        id={"password"}
        label={"Contraseña"}
        secureTextEntry
        keyboardType="email-address"
        autoCapitalize="none"
        errorText={"Ingresá una contraseña de al menos 6 caracteres."}
        placeholder={"Contraseña"}
        required
        password
        maxLength={30}
        minLength={6}
        onInputChange={onInputChangeHandler}
      />
      <ButtonComponent
        style={styles.button}
        title={"Ingresar"}
        handleClick={handleSignIn}
      />
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    padding: 0,
    width: "100%",
    marginBottom: 40,
    marginTop: 20,
  },
});
