import { HeaderButtons, Item } from "react-navigation-header-buttons";
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CustomHeaderButton } from "../../components/CustomHeaderButton";
import { FlatList } from "react-native";
import { PlaceItem } from "../../components/PlaceItem";
import ROUTES from "../../constants/routes";
import { Screen } from "../Screen";
import { loadPlaces } from "../../store/actions/places.actions";

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
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={(data) => (
          <PlaceItem
            title={data.item.title}
            image={data.item.image}
            address={data.item.address}
            lat={data.item.lat}
            lng={data.item.lng}
            onSelect={() => {
              //navigation.navigate("Detalle");
            }}
          />
        )}
      />
    </Screen>
  );
};
