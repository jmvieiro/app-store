import React, { useEffect, useReducer } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import COLORS from "../constants/colors";
import { TextComponent } from "./TextComponent";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      break;
  }
};

export const InputForm = (props) => {
  const [inputState, inputDispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    touched: false,
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    props.onInputChange(id, inputState.value, inputState.isValid);
  }, [onInputChange, id, inputState]);

  const handleBlur = () => inputDispatch({ type: INPUT_BLUR });

  const handleChangeText = (text) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) isValid = false;
    if (props.email && !emailRegex.test(text.toLowerCase())) isValid = false;
    if (props.minLength && text.length < props.minLength) isValid = false;
    if (props.maxLength && text.length > props.maxLength) isValid = false;
    if (props.password && props.password2 && props.password !== props.password2)
      isValid = false;
    inputDispatch({
      type: INPUT_CHANGE,
      value: text,
      isValid: isValid,
    });
  };
  return (
    <View style={styles.formControl}>
      <TextComponent style={styles.label}>{props.label}</TextComponent>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={handleChangeText}
        onBlur={handleBlur}
      />
      {!inputState.isValid && inputState.touched && (
        <View>
          <TextComponent style={styles.errorText}>
            {props.errorText}
          </TextComponent>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: COLORS.header,
    borderWidth: 1,
    borderStyle: "solid",
    color: COLORS.white,
    fontFamily: "Roboto-Medium",
    width: 300,
    padding: 10,
    margin: 10,
    borderRadius: 6,
    height: 50,
    fontSize: 18,
  },
  errorText: {
    color: COLORS.secondary,
    paddingLeft: 10,
    marginBottom: 10,
    fontFamily: "Roboto-Medium",
  },
  label: {
    fontFamily: "Roboto-Medium",
    marginVertical: 8,
  },
  formControl: {
    width: "100%",
  },
});
