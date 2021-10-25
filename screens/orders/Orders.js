import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container } from "../../components/Container";
import { FlatList } from "react-native";
import { Loader } from "../../components/Loader";
import { OrderListItem } from "./OrderListItem";
import { Screen } from "../Screen";
import { TextComponent } from "../../components/TextComponent";
import { _getOrdersByUser } from "../../store/actions/order.actions";

export const Orders = ({ navigation }) => {
  const email = useSelector((state) => state.auth.email);
  const list = useSelector((state) => state.orders.list);
  const status = useSelector((state) => state.orders.status);
  const dispatch = useDispatch();

  useEffect(() => {
    const waitForData = async () => {
      dispatch(_getOrdersByUser(email));
    };
    waitForData();
  }, []);

  return (
    <Screen>
      {status === "loading" ? (
        <Loader />
      ) : (
        <Container>
          {list.length === 0 ? (
            <TextComponent
              style={{
                marginTop: 50,
              }}
            >
              No tenés órdenes generadas.
            </TextComponent>
          ) : (
            <FlatList
              data={list}
              renderItem={(data) => {
                return (
                  <OrderListItem navigation={navigation} item={data.item} />
                );
              }}
              keyExtractor={(item) => item.id}
            />
          )}
        </Container>
      )}
    </Screen>
  );
};
