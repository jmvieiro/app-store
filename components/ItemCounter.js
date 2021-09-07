import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

import { ButtonComponent } from "./ButtonComponent";
import COLORS from "../constants/colors";
import { CartContext } from "../context/CartContext";
import { Input } from "./Input";

export const ItemCounter = ({
  product,
  initial = 1,
  onAdd = null,
  checkout = false,
}) => {
  const [counter, setCounter] = useState(initial);
  const { cart, removeItem, addItem } = useContext(CartContext);
  let productInCart = cart.find((e) => e.product.id === product.id);
  let remainingStock = productInCart
    ? product.stock - productInCart.qty
    : product.stock;
  const remove = () => {
    removeItem(product.id);
  };
  const sumar = () => {
    if (checkout) {
      if (counter < product.stock) {
        addItem(product, counter + 1, true);
        setCounter(counter + 1);
      }
    } else {
      if (counter < remainingStock) setCounter(counter + 1);
    }
  };
  const restar = () => {
    if (checkout) {
      if (counter > 1) {
        addItem(product, counter - 1, true);
        setCounter(counter - 1);
      }
    } else {
      if (counter > 1) setCounter(counter - 1);
    }
  };

  const manualChange = (e) => {
    let value = parseInt(e);
    if (checkout) {
      if (value > 1 && value < remainingStock) {
        addItem(product, value, true);
        setCounter(value);
      } else {
        addItem(product, product.stock, true);
        setCounter(product.stock);
      }
    } else {
      if (value > 1 && value < remainingStock) setCounter(value);
      else setCounter(remainingStock);
    }
  };
  return (
    <View style={{ marginTop: 15 }}>
      <View style={{ flexDirection: "row" }}>
        <ButtonComponent
          title="-"
          handleClick={restar}
          style={{ ...styles.button, ...styles.buttonRemove }}
        />
        <Input
          onChangeText={manualChange}
          value={counter.toString()}
          blurOnSubmit
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
            handleClick={remove}
          />
        ) : (
          <ButtonComponent
            title="Agregar"
            style={styles.buttonAddToCart}
            handleClick={() => onAdd(counter)}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRemoveFromCart: {
    padding: 0,
    width: 100,
    marginTop: 10,
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
