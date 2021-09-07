import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { ButtonComponent } from "../components/ButtonComponent";
import COLORS from "../constants/colors";
import { CarouselComponent } from "../components/CarouselComponent";
import { Loader } from "../components/Loader";
import ROUTES from "../constants/routes";

export const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const waitForData = async () => {
      setLoading(false);
    };
    waitForData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <SafeAreaView style={styles.container}>
            <CarouselComponent navigation={navigation} />
            <ButtonComponent
              title="Ver productos"
              style={{
                width: 200,
                alignSelf: "center",
                marginTop: 20,
                borderWidth: 0,
              }}
              handleClick={() => {
                navigation.navigate(ROUTES.PRODUCTS);
              }}
            />
          </SafeAreaView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
