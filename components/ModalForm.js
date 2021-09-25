import { Modal, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ButtonComponent } from "./ButtonComponent";
import COLORS from "../constants/colors";
import { Container } from "./Container";
import { Input } from "./Input";
import { Screen } from "../screens/Screen";
import { TextComponent } from "./TextComponent";
import accounting from "accounting";
import { confirmCart_ } from "../store/actions/cart.actions";
import { showAlert } from "../utils/helper";

export const ModalForm = ({ modalVisible, handleModalClose }) => {
  const cart = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.total);
  const cartSize = useSelector((state) => state.cart.cartSize);
  const email = useSelector((state) => state.auth.email);

  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: email, name: "", phone: "" });
  const confirmarCarrito = () => {
    if (!form.name) {
      showAlert("Ingresá tu nombre para completar el checkout.", "", "error");
      return;
    }
    if (!form.phone) {
      showAlert("Ingresá un teléfono para completar el checkout.", "", "error");
      return;
    }
    dispatch(confirmCart_(cart, form.email, form.name, form.phone));
  };
  return (
    <Modal animationType="slide" visible={modalVisible} transparent>
      <Screen>
        <ScrollView>
          <View style={styles.modalContainer}>
            <Container style={styles.modalContent}>
              <TextComponent style={styles.modalMessage}>Resumen</TextComponent>
              <View style={{ marginVertical: 40 }}>
                <TextComponent style={styles.modalMessage}>
                  Ítems: {cartSize}
                </TextComponent>
                <TextComponent style={styles.modalMessage}>
                  Total: {accounting.formatMoney(total, "$")}
                </TextComponent>
              </View>
              <TextComponent style={styles.modalMessage}>
                Checkout
              </TextComponent>
              <View style={{ marginVertical: 40 }}>
                <Input
                  value={form.email}
                  style={styles.input}
                  editable={false}
                />
                <Input
                  placeholder={"Nombre"}
                  blurOnSubmit
                  maxLength={30}
                  style={styles.input}
                  onChangeText={(e) => setForm({ ...form, name: e })}
                />
                <Input
                  placeholder={"1122334455"}
                  blurOnSubmit
                  maxLength={30}
                  style={styles.input}
                  onChangeText={(e) => setForm({ ...form, phone: e })}
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <ButtonComponent
                  title="Cancelar"
                  handleClick={handleModalClose}
                  style={{
                    backgroundColor: COLORS.secondary,
                    width: 150,
                  }}
                ></ButtonComponent>
                <ButtonComponent
                  title="Confirmar"
                  handleClick={confirmarCarrito}
                  style={{
                    backgroundColor: COLORS.success,
                    width: 150,
                  }}
                ></ButtonComponent>
              </View>
            </Container>
          </View>
        </ScrollView>
      </Screen>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    backgroundColor: COLORS.background,
  },
  modalContent: { marginTop: 70, marginBottom: 70 },
  modalMessage: {
    fontSize: 30,
    color: COLORS.white,
  },
  modalTitle: {
    color: COLORS.white,
    fontSize: 34,
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    width: 300,
    padding: 10,
    margin: 10,
    borderRadius: 6,
    height: 50,
    fontSize: 18,
  },
});
