import { URL_API } from "../../constants/database";
import { _getOrdersByUser } from "./order.actions";
import { _updateStock } from "./product.actions";
import { updateStock } from "../../firebase/client";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const CONFIRM_CART = "CONFIRM_CART";
export const CLEAR_CART = "CLEAR_CART";

export const addProduct_ = (product, qty, update) => ({
  type: ADD_PRODUCT,
  product: product,
  qty: qty,
  update: update,
});

export const removeProduct_ = (id) => ({
  type: REMOVE_PRODUCT,
  id,
});

export const clearCart_ = () => ({
  type: CLEAR_CART,
});

export const confirmCart_ = (cart, email, name, phone, action) => {
  return async (dispacth) => {
    try {
      const total = cart
        .map((item) => item.qty * item.product.price)
        .reduce((a, b) => a + b, 0);
      const totalItems = cart
        .map((item) => item.qty)
        .reduce((a, b) => a + b, 0);
      const order = {
        buyer: { email: email, name: name, phone: phone },
        detail: cart.map((element) => ({
          idProduct: element.product.id,
          title: element.product.title,
          qty: element.qty,
        })),
        totalItems: totalItems,
        total: total,
        ts_created: Date.now(),
      };

      dispacth({
        type: CONFIRM_CART,
        status: "loading",
      });

      await fetch(`${URL_API}/carrito.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order,
        }),
      });

      await updateStock(order, action).then((response) => {
        if (response.res === "success") {
          dispacth(_updateStock(order.detail));
          dispacth(_getOrdersByUser(email));
        }
        return response;
      });
      dispacth({
        type: CONFIRM_CART,
        status: "success",
      });
    } catch (error) {
      console.log(error.message);
      dispacth({
        type: CONFIRM_CART,
        status: "error",
      });
    }
  };
};
