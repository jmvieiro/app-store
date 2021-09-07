import React, { useEffect, useState } from "react";

import { Loader } from "../components/Loader";
import { getProducts } from "../firebase/client";

export const ShopContext = React.createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const waitForData = async () => {
      setProducts(await getProducts());
      setLoading(false);
    };
    waitForData();
  }, []);

  return (
    <ShopContext.Provider value={{ products, setProducts }}>
      {loading ? <Loader /> : children}
    </ShopContext.Provider>
  );
};
