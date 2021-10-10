import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { ButtonComponent } from "../../components/ButtonComponent";
import COLORS from "../../constants/colors";
import { ImageSelector } from "../../components/ImageSelector";
import { Input } from "../../components/Input";
import { LocationSelector } from "../../components/LocationSelector";
import ROUTES from "../../constants/routes";
import { Screen } from "../Screen";
import { TextComponent } from "../../components/TextComponent";
import { addPlace } from "../../store/actions/places.actions";

export const NewPlace = ({ navigation }) => {
  const email = useSelector((state) => state.auth.email);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const dispatch = useDispatch();
  
  const handleSave = () => {
    dispatch(addPlace(email, title, image, lat, lng));
    navigation.navigate(ROUTES.PLACE_LIST);
  };

  const handlePickImage = (uri) => {
    setImage(uri);
  };

  const handlePickLocation = (loc) => {
    setLat(loc.coords.latitude);
    setLng(loc.coords.longitude);
  };

  return (
    <Screen>
      <ScrollView>
        <View style={{ alignItems: "flex-start", flex: 1, padding: 10 }}>
          <TextComponent>Título</TextComponent>
          <Input
            placeholder={"Título"}
            blurOnSubmit
            maxLength={30}
            style={styles.input}
            onChangeText={(e) => {
              setTitle(e);
            }}
          />
        </View>
        <View>
          <ImageSelector onImage={handlePickImage} />
          <LocationSelector onLocation={handlePickLocation} />
        </View>

        <View style={{ alignItems: "center", padding: 10 }}>
          <ButtonComponent
            title="Grabar dirección"
            handleClick={handleSave}
            style={{
              backgroundColor: COLORS.success,
              width: "100%",
              marginTop: 10,
            }}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderRadius: 6,
    height: 50,
    fontSize: 18,
  },
});
