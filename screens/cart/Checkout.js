import React, { useEffect, useState } from "react";
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
            {cartSize > 0 && (
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
                    Total: {accounting.formatMoney(total, "$")}
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
            <TextComponent
              style={{
                marginTop: 50,
              }}
            >
              No tenés productos en el carrito.
            </TextComponent>
          )}
        </Container>
      )}

      {/* <View>
        <TextComponent>Cart en Redux</TextComponent>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.product.id}
          renderItem={(data) => {
            return <CartItem item={data.item.product} />;
          }}
        />
      </View>
      <View>
        {status === "loading" ? (
          <ActivityIndicator color={COLORS.header} size="large" />
        ) : (
          <>
            <TextComponent>{total}</TextComponent>
            <ButtonComponent
              title={`Confirmar`}
              handleClick={() => {
                dispatch(confirmCart_(cart));
              }}
            />
          </>
        )}
      </View> */}
    </Screen>
  );
};
