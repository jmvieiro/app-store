import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { addProduct_, removeProduct_ } from "../store/actions/cart.actions";
import { useDispatch, useSelector } from "react-redux";

import { ButtonComponent } from "./ButtonComponent";
import COLORS from "../constants/colors";
import { Input } from "./Input";

export const ItemCounter = ({
  product,
  initial = 1,
  onAdd = null,
  checkout = false,
}) => {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(1);
  const cart = useSelector((state) => state.cart.cart);
  let productInCart = cart.find((e) => e.product.id === product.id);
  let remainingStock = productInCart
    ? parseInt(product.stock) - parseInt(productInCart.qty)
    : product.stock;
  useEffect(() => {
    setCounter(initial.toString());
  }, [initial]);
  const sumar = () => {
    if (checkout) {
      if (counter < product.stock) {
        dispatch(addProduct_(product, parseInt(counter) + 1, true));
        setCounter(parseInt(counter) + 1);
      }
    } else if (counter < remainingStock) setCounter(parseInt(counter) + 1);
  };
  const restar = () => {
    if (checkout) {
      if (counter > 1) {
        dispatch(addProduct_(product, parseInt(counter) - 1, true));
        setCounter(parseInt(counter) - 1);
      }
    } else if (counter > 1) setCounter(parseInt(counter) - 1);
  };
  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <ButtonComponent
          title="-"
          handleClick={restar}
          style={{ ...styles.button, ...styles.buttonRemove }}
        />
        <Input
          value={counter.toString()}
          blurOnSubmit
          editable={false}
          autoCapitalization="none"
          keyboardType="numeric"
          maxLength={2}
          autoCorrect={false}
          textAlign="center"
          style={{ flex: 1 }}
        />
        <ButtonComponent
          title="+"
          handleClick={sumar}
          style={{ ...styles.button, ...styles.buttonAdd }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "flex-end",
        }}
      >
        {checkout ? (
          <ButtonComponent
            title="Eliminar"
            style={styles.buttonRemoveFromCart}
            handleClick={() => {
              dispatch(removeProduct_(product.id));
            }}
          />
        ) : (
          <ButtonComponent
            title="Agregar"
            style={styles.buttonAddToCart}
            handleClick={() => onAdd(counter)}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonRemoveFromCart: {
    padding: 0,
    width: 80,
    marginTop: 5,
    backgroundColor: COLORS.secondary,
  },
  buttonAddToCart: {
    padding: 0,
    width: 100,
    marginTop: 10,
  },
  button: {
    padding: 0,
    width: 40,
  },
  buttonAdd: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    marginLeft: 0,
    backgroundColor: COLORS.success,
  },
  buttonRemove: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    marginLeft: 0,
    backgroundColor: COLORS.secondary,
  },
});
