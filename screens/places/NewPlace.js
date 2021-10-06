import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { ButtonComponent } from "../../components/ButtonComponent";
import COLORS from "../../constants/colors";
import { ImageSelector } from "../../components/ImageSelector";
import { Input } from "../../components/Input";
import ROUTES from "../../constants/routes";
import { Screen } from "../Screen";
import { TextComponent } from "../../components/TextComponent";
import { addPlace } from "../../store/actions/places.actions";

export const NewPlace = ({ navigation }) => {
  const email = useSelector((state) => state.auth.email);

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState();
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const dispatch = useDispatch();
  const handleSave = () => {
    dispatch(addPlace(email, title, address, image, lat, lng));
    navigation.navigate(ROUTES.PLACE_LIST);
  };

  const handlePickImage = (uri) => {
    setImage(uri);
  };

  return (
    <Screen>
      <ScrollView>
        <View style={styles.container}>
          <View style={{ alignItems: "flex-start" }}>
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
            <TextComponent>Dirección</TextComponent>
            <Input
              placeholder={"Dirección"}
              blurOnSubmit
              maxLength={30}
              style={styles.input}
              onChangeText={(e) => {
                setAddress(e);
              }}
            />
          </View>
          <ImageSelector onImage={handlePickImage} />
          <ButtonComponent
            title="Grabar dirección"
            handleClick={handleSave}
            style={{
              backgroundColor: COLORS.success,
              width: 150,
              marginTop: 40,
            }}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  input: {
    width: 300,
    padding: 10,
    marginVertical: 10,
    borderRadius: 6,
    height: 50,
    fontSize: 18,
  },
});
