import { getProducts, getProductsByCategory } from "../../firebase/client";

export const SELECT_PRODUCT = "SELECT_PRODUCT";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_BY_CATEGORY = "GET_PRODUCTS_BY_CATEGORY";
export const UPDATE_STOCK = "UPDATE_STOCK";

export const selectProduct = (product) => ({
  type: SELECT_PRODUCT,
  product,
});

export const filterProducts = (category) => ({
  type: FILTER_PRODUCTS,
  categoryId: category.id,
});


export const _updateStock = (products) => ({
  type: UPDATE_STOCK,
  products,
});

export const _getProducts = () => {
  return async (dispacth) => {
    try {
      dispacth({
        type: GET_PRODUCTS,
        status: "loading",
      });
      const response = await getProducts();
      dispacth({
        type: GET_PRODUCTS,
        list: response,
        status: "success",
      });
    } catch (error) {
      console.log(error.message);
      dispacth({
        type: GET_PRODUCTS,
        status: "error",
      });
    }
  };
};

export const _getProductsByCategory = (category) => {
  return async (dispacth) => {
    try {
      dispacth({
        type: GET_PRODUCTS_BY_CATEGORY,
        status: "loading",
      });
      const response = await getProductsByCategory(category.id);
      dispacth({
        type: GET_PRODUCTS_BY_CATEGORY,
        filtered: response,
        status: "success",
      });
    } catch (error) {
      console.log(error.message);
      dispacth({
        type: GET_PRODUCTS_BY_CATEGORY,
        status: "error",
      });
    }
  };
};
