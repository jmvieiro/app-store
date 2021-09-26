import { getOrdersByUser } from "../../firebase/client";

export const GET_ORDERS_BY_EMAIL = "GET_ORDERS_BY_EMAIL";
export const SELECT_ORDER = "SELECT_ORDER";


export const selectOrder = (order) => ({
  type: SELECT_ORDER,
  order,
});

export const _getOrdersByUser = (email) => {
  return async (dispacth) => {
    try {
      dispacth({
        type: GET_ORDERS_BY_EMAIL,
        status: "loading",
      });
      const response = await getOrdersByUser(email);
      dispacth({
        type: GET_ORDERS_BY_EMAIL,
        list: response,
        status: "success",
      });
    } catch (error) {
      console.log(error.message);
      dispacth({
        type: GET_ORDERS_BY_EMAIL,
        status: "error",
      });
    }
  };
};
