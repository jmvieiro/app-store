import { Image, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

import { APP_NAME } from "../utils/const";
import COLORS from "../constants/colors";
import { Container } from "../components/Container";
import { Loader } from "../components/Loader";
import { Screen } from "./Screen";
import { TextComponent } from "../components/TextComponent";

export const Contact = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const waitForData = async () => {
      setLoading(false);
    };
    waitForData();
  }, []);
  return (
    <Screen>
      {loading ? (
        <Loader />
      ) : (
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
            <TextComponent style={styles.text}>Coded with ❤.</TextComponent>
            <TextComponent style={styles.text}>{APP_NAME}</TextComponent>
          </View>
        </Container>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.background,
    marginTop: 10,
  },
});
