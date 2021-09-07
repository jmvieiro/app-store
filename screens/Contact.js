import React, { useEffect, useState } from "react";

import { Container } from "../components/Container";
import { Loader } from "../components/Loader";
import { Screen } from "./Screen";
import { Text } from "react-native";

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
        <Container>
          <Text>Contact</Text>
        </Container>
      )}
    </Screen>
  );
};
