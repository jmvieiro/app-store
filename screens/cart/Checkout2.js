import React, { useContext, useEffect, useState } from "react";

import { ButtonComponent } from "../../components/ButtonComponent";
import COLORS from "../../constants/colors";
import { CartContext } from "../../context/CartContext";
import { Container } from "../../components/Container";
import { List } from "../../components/List/List";
import { Loader } from "../../components/Loader";
import { ModalForm } from "../../components/ModalForm";
import ROUTES from "../../constants/routes";
import { Screen } from "../Screen";
import { TextComponent } from "../../components/TextComponent";
import { View } from "react-native";
import accounting from "accounting";
import { selectCategory } from "../../store/actions/category.actions";
import { useDispatch } from "react-redux";

export const Checkout = ({ navigation }) => {
  const dispatch = useDispatch();
  const { clear, cart, cartTotal, cartSize } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <Screen>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <View style={{ flexDirection: "row", paddingBottom: 25 }}>
            <TextComponent style={{ fontSize: 22, flex: 1 }}>
              Carrito de compras
            </TextComponent>
            {cartSize > 0 && (
              <ButtonComponent
                title="Vaciar carrito"
                handleClick={clear}
                style={{
                  backgroundColor: COLORS.secondary,
                  width: 120,
                  padding: 4,
                }}
              ></ButtonComponent>
            )}
          </View>
          {cartSize > 0 ? (
            <>
              <List navigation={navigation} data={cart} checkout={true} />
              <View
                style={{
                  marginTop: 15,
                  flexDirection: "row",
                }}
              >
                <View style={{ flex: 1, alignSelf: "flex-start" }}>
                  <TextComponent style={{ fontSize: 18 }}>
                    Ítems: {cartSize}
                  </TextComponent>
                  <TextComponent style={{ fontSize: 18 }}>
                    Total: {accounting.formatMoney(cartTotal, "$")}
                  </TextComponent>
                </View>
                <View style={{ paddingTop: 10, alignSelf: "flex-end" }}>
                  <ButtonComponent
                    title="Confirmar carrito"
                    handleClick={handleModalOpen}
                    style={{
                      backgroundColor: COLORS.success,
                      width: 150,
                    }}
                  ></ButtonComponent>
                </View>
              </View>
              <ModalForm
                handleModalClose={handleModalClose}
                modalVisible={modalVisible}
              />
            </>
          ) : (
            <>
              <TextComponent
                style={{
                  marginTop: 50,
                }}
              >
                No tenés productos en el carrito.
              </TextComponent>
              <ButtonComponent
                title={`Ir de compras`}
                handleClick={() => {
                  dispatch(selectCategory({}));
                  navigation.navigate(ROUTES.PRODUCTS);
                }}
                style={{
                  backgroundColor: COLORS.success,
                  width: 150,
                  marginTop: 30,
                }}
              />
            </>
          )}
        </Container>
      )}
    </Screen>
  );
};
