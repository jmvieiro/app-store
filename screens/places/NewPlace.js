import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { ButtonComponent } from "../../components/ButtonComponent";
import COLORS from "../../constants/colors";
import { Input } from "../../components/Input";
import ROUTES from "../../constants/routes";
import { Screen } from "../Screen";
import { TextComponent } from "../../components/TextComponent";
import { addPlace } from "../../store/actions/places.actions";
import { useDispatch } from "react-redux";

export const NewPlace = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const handleTextChange = (e) => {
    setTitle(e);
  };
  const handleSave = () => {
    dispatch(addPlace(title));
    navigation.navigate(ROUTES.PLACE_LIST);
  };

  return (
    <Screen>
      <ScrollView>
        <View style={styles.container}>
          <TextComponent style={styles.label}>Título</TextComponent>
          <Input
            placeholder={"Título"}
            blurOnSubmit
            maxLength={30}
            style={styles.input}
            onChangeText={handleTextChange}
          />
          <ButtonComponent
            title="Grabar dirección"
            handleClick={handleSave}
            style={{
              backgroundColor: COLORS.success,
              width: 150,
            }}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "flex-start" },
  input: {
    width: 300,
    padding: 10,
    marginVertical: 10,
    borderRadius: 6,
    height: 50,
    fontSize: 18,
  },
});
