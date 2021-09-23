import React, { useEffect, useState } from "react";

import { Container } from "../../components/Container";
import { Loader } from "../../components/Loader";
import { Screen } from "../Screen";

export const Orders = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  return <Screen>{loading ? <Loader /> : <Container></Container>}</Screen>;
};
