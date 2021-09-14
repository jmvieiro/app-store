export const SELECT_PRODUCT = "SELECT_PRODUCT";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";

export const selectProduct = (product) => ({
  type: SELECT_PRODUCT,
  payload: product,
});

export const filterProducts = (category) => ({
  type: FILTER_PRODUCTS,
  payload: category,
});
