import { IToken } from "models/utils.model";

export const getToken = () => JSON.parse(localStorage.getItem("token") as any);

export const setToken = (token: IToken) => {
  try {
    if (!token) return;

    localStorage.setItem("token", JSON.stringify(token));
  } catch (ex) {
    console.log("TOKEN catch", JSON.stringify(token));
    console.log("Failed decode token", ex);
  }
};

export const setIsLoggedIn = () => localStorage.setItem("isLoggedIn", 1 as any);
