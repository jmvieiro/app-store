import { StyleSheet, View } from "react-native";

import { ButtonComponent } from "../../components/ButtonComponent";
import COLORS from "../../constants/colors";
import { Container } from "../../components/Container";
import React from "react";
import { Screen } from "../Screen";
import { TextComponent } from "../../components/TextComponent";
import { useNavigation } from "@react-navigation/native";

export const AuthWrapper = ({
  children,
  title,
  message,
  buttonText,
  buttonPath,
}) => {
  const navigation = useNavigation();
  return (
    <Screen>
      <Container style={styles.container}>
        <TextComponent style={styles.title}>{title}</TextComponent>
        {children}
        <View>
          <TextComponent style={styles.message}>{message}</TextComponent>
          <ButtonComponent
            style={styles.button}
            title={buttonText}
            handleClick={() => {
              navigation.navigate(buttonPath);
            }}
          />
        </View>
      </Container>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    color: COLORS.header,
  },
  message: {
    fontSize: 20,
    color: COLORS.header,
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.secondary,
    padding: 0,
    width: "100%",
    marginLeft: 1,
  },
});
