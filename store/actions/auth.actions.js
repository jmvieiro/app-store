import { AUTH_API_KEY, URL_AUTH_API } from "../../constants/database";

import { showError } from "../../utils/helper";

export const SIGN_UP = "signUp";
export const SIGN_IN = "signInWithPassword";

export const authenticate = (email, password, method) => {
  return async (dispacth) => {
    try {
      dispacth({
        type: method,
        status: "loading",
      });
      const response = await fetch(
        `${URL_AUTH_API.concat(method, AUTH_API_KEY)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returSecureToken: true,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        showError(data.error.errors[0].message, "", "error");
        setTimeout(() => {
          dispacth({
            type: method,
            status: "error",
          });
        }, 2000);
      }
      setTimeout(() => {
        dispacth({
          type: method,
          token: data.idToken,
          userId: data.localId,
          email: data.email,
          status: "success",
        });
      }, 2000);
    } catch (error) {
      console.log(error.message);
      dispacth({
        type: method,
        status: "error",
      });
    }
  };
};
