import React, { useReducer, createContext } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const initialState = { user: null };

if (Cookies.getJSON("jwtToken")) {
  const decodedToken = jwtDecode(Cookies.getJSON("jwtToken"));
  if (decodedToken.exp * 1000 < Date.now()) {
    Cookies.remove("jwtToken");
  }
  initialState.user = decodedToken;
}

const AuthContext = createContext({
  user: null,
  login: userData => {},
  logout: () => {}
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload
      };

    case "LOGOUT":
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = userData => {
    let expireTime = 1 / 24; // 1 hour
    Cookies.set("jwtToken", userData.token, { expires: expireTime });
    dispatch({
      type: "LOGIN",
      payload: userData
    });
  };

  const logout = () => {
    Cookies.remove("jwtToken");
    dispatch({
      type: "LOGOUT"
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
