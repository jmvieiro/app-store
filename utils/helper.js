import { APP_NAME } from "./const";
import { Alert } from "react-native";

export const showAlert = (title, html, type, action = null) => {
  let header = APP_NAME;
  header += type === "error" ? " ¡Error!" : " ¡Éxito!";
  title += " " + html;
  Alert.alert(header, title, [
    {
      text: "OK",
      onPress: () => {
        action;
      },
    },
  ]);
};

export const showError = (title, html, type, action = null) => {
  switch (title) {
    case "EMAIL_NOT_FOUND":
    case "INVALID_PASSWORD":
      title = "Usuario y/o contraseñas incorrectos.";
      break;
    case "WEAK_PASSWORD":
      title = "Ingresá una contraseña de al menos 6 caracteres.";
      break;
    case "EMAIL_EXISTS":
      title = "El email ingresado ya se encuentra registrado.";
      break;
    default:
      title = "Ha ocurrido un error al autenticarte: " + title;
      break;
  }
  showAlert(title, html, type, action);
};

export const toFullDate = (unix_timestamp) => {
  let date = new Date(unix_timestamp);
  let day = "0" + date.getDate();
  let month = "0" + (date.getMonth() + 1);
  let year = date.getFullYear();
  let hours = "0" + date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  return (
    day.substr(-2) +
    "/" +
    month.substr(-2) +
    "/" +
    year +
    " " +
    hours.substr(-2) +
    ":" +
    minutes.substr(-2) +
    ":" +
    seconds.substr(-2)
  );
};
