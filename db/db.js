import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("address.db");

export const init = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS address (
          id INTEGER PRIMARY KEY NOT NULL,
          user TEXT NOT NULL,
          title TEXT NOT NULL,
          image TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        )`,
        [],
        () => resolve(),
        (_, err) => reject(err)
      );
    });
  });
};

export const drop = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DROP TABLE address`,
          [],
          () => resolve(),
          (_, err) => reject(err)
        );
      });
    });
  };

export const insertAddress = (user, title, image, address, lat, lng) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO address (user, title, image, address, lat, lng) VALUES (?, ?, ?, ?, ?, ?)",
        [user, title, image, address, lat, lng],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const getAddresses = (user) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM address WHERE user = ?",
        [user],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};
