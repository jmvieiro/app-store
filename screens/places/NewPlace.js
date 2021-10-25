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
import { showAlert } from "../../utils/helper";

export const NewPlace = ({ navigation }) => {
  const email = useSelector((state) => state.auth.email);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState();
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const dispatch = useDispatch();

  const handleSave = () => {
    if (!title) {
      showAlert("Ingresá el título de la dirección.", "", "error");
      return;
    }
    if (!image) {
      showAlert("Ingresá la foto asociada a la dirección.", "", "error");
      return;
    }
    if (lat === 0 || lng === 0) {
      showAlert("Ingresá los datos de la ubicación.", "", "error");
      return;
    }
    dispatch(addPlace(email, title, image, lat, lng, address));
    navigation.navigate(ROUTES.PLACE_LIST);
  };

  const handlePickImage = (uri) => {
    setImage(uri);
  };

  const handlePickLocation = (loc) => {
    setLat(loc.lat);
    setLng(loc.lng);
    setAddress(loc.address);
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

        <View style={{ alignItems: "center" }}>
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
