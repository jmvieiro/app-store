import { HeaderButtons, Item } from "react-navigation-header-buttons";
import React, { useLayoutEffect } from "react";

import { Container } from "../../components/Container";
import { CustomHeaderButton } from "../../components/CustomHeaderButton";
import ROUTES from "../../constants/routes";
import { Screen } from "../Screen";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export const PlaceList = ({ navigation }) => {
  const list = useSelector((state) => state.places.places);
  console.log(list);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Nueva"
            iconName="md-add"
            onPress={() => navigation.navigate(ROUTES.NEW_PLACE)}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <Screen>
      <Container></Container>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
