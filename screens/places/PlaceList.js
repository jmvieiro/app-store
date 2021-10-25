import { HeaderButtons, Item } from "react-navigation-header-buttons";
import React, { useEffect, useLayoutEffect } from "react";
import { loadPlaces, selectPlace } from "../../store/actions/places.actions";
import { useDispatch, useSelector } from "react-redux";

import { Container } from "../../components/Container";
import { CustomHeaderButton } from "../../components/CustomHeaderButton";
import { FlatList } from "react-native";
import { PlaceItem } from "../../components/PlaceItem";
import ROUTES from "../../constants/routes";
import { Screen } from "../Screen";
import { TextComponent } from "../../components/TextComponent";

export const PlaceList = ({ navigation }) => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const places = useSelector((state) => state.places.places);

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

  useEffect(() => {
    dispatch(loadPlaces(email));
  }, []);

  return (
    <Screen>
      <Container>
        {places.length === 0 ? (
          <TextComponent
            style={{
              marginTop: 50,
            }}
          >
            No tenés direcciones guardadas.
          </TextComponent>
        ) : (
          <FlatList
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={(data) => (
              <PlaceItem
                title={data.item.title}
                image={data.item.image}
                address={data.item.address}
                onSelect={() => {
                  dispatch(selectPlace(data.item));
                  navigation.navigate(ROUTES.PLACE_DETAIL);
                }}
              />
            )}
          />
        )}
      </Container>
    </Screen>
  );
};
