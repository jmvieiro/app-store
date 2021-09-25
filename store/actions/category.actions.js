import { getCategories } from "../../firebase/client";

export const SELECT_CATEGORY = "SELECT_CATEGORY";
export const GET_CATEGORIES = "GET_CATEGORIES";

export const selectCategory = (category) => ({
  type: SELECT_CATEGORY,
  category,
});

export const _getCategories = () => {
  return async (dispacth) => {
    try {
      dispacth({
        type: GET_CATEGORIES,
        status: "loading",
      });
      let response = await getCategories();
      response = [{ id: null, name: "Todos los productos" }, ...response];
      dispacth({
        type: GET_CATEGORIES,
        list: response,
        status: "success",
      });
    } catch (error) {
      console.log(error.message);
      dispacth({
        type: GET_CATEGORIES,
        status: "error",
      });
    }
  };
};
