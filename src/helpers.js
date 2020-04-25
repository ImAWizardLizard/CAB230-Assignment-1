import Cookies from "js-cookie";

export const getSession = () => {
  const jwt = Cookies.get("__session");
  return jwt;
};

export const setSession = (token) => {
  Cookies.set("__session", token);
};

export const logOut = () => {
  Cookies.remove("__session");
};
