import React from "react";
import { updateStock } from "../firebase/client";
import { useSelector } from "react-redux";

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const PRODUCTS = useSelector((state) => state.products.list);

  const createOrder = (email, name, phone) => {
    const order = {};
    return updateStock(order, clear).then((response) => {
      if (response.res === "success") {
        PRODUCTS.forEach((item) => {
          let aux = order.detail.find((i) => i.idProduct === item.id);
          if (aux) item.stock -= aux.qty;
        });
        setProducts(PRODUCTS);
      }
      return response;
    });
  };

  return (
    <CartContext.Provider
      value={{
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
