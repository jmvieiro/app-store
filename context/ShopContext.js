import React, { useEffect, useState } from "react";
import { getCategories, getProducts } from "../firebase/client";

import { Loader } from "../components/Loader";

export const ShopContext = React.createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const waitForData = async () => {
      setProducts(await getProducts());
      setCategories(await getCategories());
      setLoading(false);
    };
    waitForData();
  }, []);

  return (
    <ShopContext.Provider value={{ products, categories, setProducts }}>
      {loading ? <Loader /> : children}
    </ShopContext.Provider>
  );
};
