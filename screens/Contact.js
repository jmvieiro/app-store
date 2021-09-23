import {
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { APP_NAME } from "../utils/const";
import COLORS from "../constants/colors";
import { Container } from "../components/Container";
import React from "react";
import { Screen } from "./Screen";
import { TextComponent } from "../components/TextComponent";

export const Contact = () => {
  return (
    <Screen>
      <Container style={{ flex: 0 }}>
        <View
          style={{
            backgroundColor: COLORS.header,
            alignItems: "center",
            borderRadius: 6,
            padding: 50,
          }}
        >
          <Image
            style={{
              height: 60,
              width: 100,
              resizeMode: "contain",
            }}
            source={require("../assets/images/logo.png")}
          />
          <TextComponent style={styles.text}>
            Gracias por visitarnos.
          </TextComponent>
          <TextComponent style={styles.text}>Coded with ❤</TextComponent>
          <TextComponent style={styles.text}>{APP_NAME}</TextComponent>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              Linking.openURL("http://github.com/jmvieiro/app-store")
            }
          >
            <TextComponent style={{ ...styles.text, ...{ fontSize: 25 } }}>
              GitHub
            </TextComponent>
          </TouchableOpacity>
        </View>
      </Container>
    </Screen>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.background,
    marginTop: 10,
  },
  button: {
    padding: 0,
    marginTop: 10,
  },
});
