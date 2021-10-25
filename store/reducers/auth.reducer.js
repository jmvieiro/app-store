import { LOG_OUT, SIGN_IN, SIGN_UP } from "../actions/auth.actions";

const initialState = {
  token: null,
  userId: null,
  email: null,
  status: "inactive",
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
    case SIGN_IN:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        email: action.email,
        status: action.status,
      };
    case LOG_OUT:
      return {
        ...state,
        token: null,
        userId: null,
        email: null,
        status: action.status,
      };
    default:
      return state;
  }
};

export default AuthReducer;
