import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ButtonComponent } from "../../components/ButtonComponent";
import COLORS from "../../constants/colors";
import { Container } from "../../components/Container";
import { List } from "../../components/List/List";
import { Loader } from "../../components/Loader";
import { ModalForm } from "../../components/ModalForm";
import { Screen } from "../Screen";
import { TextComponent } from "../../components/TextComponent";
import { View } from "react-native";
import accounting from "accounting";
import { clearCart_ } from "../../store/actions/cart.actions";

export const Checkout = ({ navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.total);
  const cartSize = useSelector((state) => state.cart.cartSize);
  const status = useSelector((state) => state.cart.status);
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <Screen>
      {status === "loading" ? (
        <Loader />
      ) : (
        <Container>
          {cartSize === 0 ? (
            <TextComponent
              style={{
                marginTop: 50,
              }}
            >
              No tenés productos en el carrito.
            </TextComponent>
          ) : (
            <>
              <View style={{ alignSelf: "flex-end", paddingBottom: 10 }}>
                <ButtonComponent
                  title="Vaciar carrito"
                  handleClick={() => {
                    dispatch(clearCart_());
                  }}
                  style={{
                    backgroundColor: COLORS.secondary,
                    width: 120,
                    padding: 4,
                  }}
                />
              </View>
              <List navigation={navigation} data={cart} checkout={true} />
              <View
                style={{
                  marginTop: 15,
                  flexDirection: "row",
                }}
              >
                <View style={{ flex: 1 }}>
                  <TextComponent style={{ fontSize: 20 }}>
                    Ítems: {cartSize}
                  </TextComponent>
                  <TextComponent style={{ fontSize: 20 }}>
                    Total: {accounting.formatMoney(total, "$")}
                  </TextComponent>
                </View>
                <View style={{ alignSelf: "flex-end" }}>
                  <ButtonComponent
                    title="Confirmar carrito"
                    handleClick={handleModalOpen}
                    style={{
                      backgroundColor: COLORS.success,
                      width: 150,
                    }}
                  />
                </View>
              </View>
              <ModalForm
                handleModalClose={handleModalClose}
                modalVisible={modalVisible}
              />
            </>
          )}
        </Container>
      )}
    </Screen>
  );
};
