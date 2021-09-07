import { APP_NAME } from "./const";
import { Alert } from "react-native";

export const showAlert = (title, html, type, action = null) => {
  let header = APP_NAME;
  header += type === "error" ? " ¡Error!" : " ¡Éxito!";
  title += " " + html;
  Alert.alert(header, title, [
    {
      text: "OK",
      onPress: action,
      // () => console.log("OK Pressed")
    },
  ]);

  // Alert.alert(
  //   "Alert Title",
  //   "My Alert Msg",
  //   [
  //     {
  //       text: "Cancel",
  //       onPress: () => console.log("Cancel Pressed"),
  //       style: "cancel"
  //     },
  //     { text: "OK", onPress: () => console.log("OK Pressed") }
  //   ]
  // );
};
