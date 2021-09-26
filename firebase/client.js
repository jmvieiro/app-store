import "@firebase/firestore";

import firebase from "firebase/app";
import { showAlert } from "../utils/helper";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDstNqfY0ONuhZTux27lTPwdSt0lOGCdNo",
  authDomain: "store-jmv.firebaseapp.com",
  projectId: "store-jmv",
  storageBucket: "store-jmv.appspot.com",
  messagingSenderId: "907971436997",
  appId: "1:907971436997:web:53c5fa1409e0b61277ebac",
});

export const getFirebase = () => {
  return firebaseConfig;
};

export const productsDB = firebase
  .firestore(firebaseConfig)
  .collection("products");
const categoriesDB = firebase
  .firestore(firebaseConfig)
  .collection("categories");
const ordersDB = firebase.firestore(firebaseConfig).collection("orders");

export const getCategories = async () => {
  try {
    const response = await categoriesDB.get();
    return response.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  } catch (res) {
    showAlert(
      `😱 Ha ocurrido un error al obtener las categorías:`,
      res,
      "error"
    );
    return [];
  }
};

export const getProducts = async () => {
  try {
    const response = await productsDB.where("stock", ">", 0).get();
    return response.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  } catch (res) {
    showAlert(
      `😱 Ha ocurrido un error al obtener los productos:`,
      res,
      "error"
    );
    return [];
  }
};

// productsDB.where("stock", ">", 0).onSnapshot((querySnapshot) => {
//   querySnapshot.docChanges().forEach((change) => {
//     if (change.type === "added") {
//       console.log("New: ", change.doc.data());
//     }
//     if (change.type === "modified") {
//       console.log("Modified: ", change.doc.data());
//     }
//     if (change.type === "removed") {
//       console.log("Removed: ", change.doc.data());
//     }
//   });
// });

export const getProductById = async (id) => {
  try {
    const response = await productsDB.doc(id).get();
    if (!response.exists) return null;
    return { id: response.id, ...response.data() };
  } catch (res) {
    showAlert(
      `😱 Ha ocurrido un error al obtener el producto por id:`,
      res,
      "error"
    );
    return {};
  }
};

export const getProductsByCategory = async (id) => {
  try {
    const response = await productsDB
      .where("category", "==", id)
      .where("stock", ">", 0)
      .get();
    return response.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  } catch (res) {
    showAlert(
      `😱 Ha ocurrido un error al obtener los productos por categoría:`,
      res,
      "error"
    );
    return [];
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await categoriesDB.doc(id).get();
    if (!response.exists) return null;
    return { id: response.id, ...response.data() };
  } catch (res) {
    showAlert(
      `😱 Ha ocurrido un error al obtener la categoría por id:`,
      res,
      "error"
    );
    return {};
  }
};

const generateOrder = (newOrder, action = null) => {
  ordersDB
    .add(newOrder)
    .then(({ id }) => {
      showAlert(
        `😎 La orden ha sido generada con éxito.`,
        `Guardá este código: ${id}. Gracias por tu compra.`,
        "success",
        action
      );
    })
    .catch((res) => {
      showAlert(`😱 Ha ocurrido un error al generar la orden:`, res, "error");
      return {};
    });
};

export const updateStock = async (newOrder, action) => {
  const productsToUpdate = productsDB.where(
    firebase.firestore.FieldPath.documentId(),
    "in",
    newOrder.detail.map((element) => element.idProduct)
  );

  const query = await productsToUpdate.get();

  const notFound = [];

  newOrder.detail.forEach((element) => {
    let aux = query.docs.find((e) => e.id === element.idProduct);
    if (!aux) notFound.push(element);
  });

  if (notFound.length !== 0) {
    let aux = notFound
      .map((element) => {
        return element.title;
      })
      .join(", ");
    return {
      res: "error",
      desc: [
        `😱 Productos no encontrados`,
        `Eliminá estos productos de tu carrito: ${aux}.`,
        "error",
      ],
    };
  }

  const db = firebase.firestore(firebaseConfig);
  const batch = db.batch();
  const outOfStock = [];

  query.docs.forEach((docSnapshot, index) => {
    if (docSnapshot.data().stock >= newOrder.detail[index].qty) {
      batch.update(docSnapshot.ref, {
        stock: docSnapshot.data().stock - newOrder.detail[index].qty,
      });
    } else outOfStock.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  if (outOfStock.length === 0) {
    await batch.commit();
    generateOrder(newOrder, action);
    return {
      res: "success",
      desc: [],
    };
  } else {
    let aux = outOfStock
      .map((element) => {
        return `${element.title} [disponible: ${element.stock} ${
          element.stock === 1 ? "unidad" : "unidades"
        }]`;
      })
      .join(", ");
    return {
      res: "error",
      desc: [
        `😱 Sin stock`,
        `Modificá el stock de los productos: ${aux}.`,
        "error",
      ],
    };
  }
};

export const getOrdersByUser = async (email) => {
  try {
    const response = await ordersDB
      .where("buyer.email", "==", email)
      .orderBy("ts_created", "desc")
      .get();
    return response.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  } catch (res) {
    showAlert(`😱 Ha ocurrido un error al obtener las órdenes:`, res, "error");
    return [];
  }
};
