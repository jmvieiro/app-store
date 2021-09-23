import { Alert, StyleSheet } from "react-native";
import { FORM_INPUT_UPDATE, formReducer } from "./formReducer";
import React, { useCallback, useReducer } from "react";

import { AuthWrapper } from "./AuthWrapper";
import { ButtonComponent } from "../../components/ButtonComponent";
import { InputForm } from "../../components/InputForm";
import ROUTES from "../../constants/routes";
import { authenticate } from "../../store/actions/auth.actions";
import { useDispatch } from "react-redux";

export const Register = ({}) => {
  const dispatch = useDispatch();
  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    formIsValid: false,
  });
  const handleSignUp = () => {
    if (formState.formIsValid)
      dispatch(
        authenticate(
          formState.inputValues.email,
          formState.inputValues.password,
          "signUp"
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
      title={"Registrate"}
      message={"¿Ya tenés cuenta?"}
      buttonText={"Ingresar"}
      buttonPath={ROUTES.LOGIN}
    >
      <InputForm
        id={"email"}
        label={"Email"}
        keyboardType="email-address"
        autoCapitalize="none"
        errorText={"Ingresá un email válido para registrarte."}
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
        maxLength={30}
        minLength={6}
        onInputChange={onInputChangeHandler}
      />
      {/* <InputForm
        id={"password2"}
        label={"Reingresar contraseña"}
        secureTextEntry
        keyboardType="email-address"
        autoCapitalize="none"
        errorText={"Ingresá una contraseña de al menos 6 caracteres."}
        placeholder={"Contraseña"}
        required
        maxLength={30}
        minLength={6}
        onInputChange={onInputChangeHandler}
      /> */}
      <ButtonComponent
        style={styles.button}
        title={"Registrarme"}
        handleClick={handleSignUp}
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
