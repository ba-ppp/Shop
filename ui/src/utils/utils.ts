import { IToken } from "models/utils.model";
import jwt_decode from "jwt-decode";

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

export const isTokenExpired = (token: string) => {
  const { exp } = jwt_decode(token) as any;
  if (exp < (new Date().getTime() + 1) / 1000) {
    return true;
  }
  return false;
};

export const isAdmin = (token: string) => {
  if (!isTokenExpired(token)) {
    const { isAdmin } = jwt_decode(token) as any;
    return isAdmin;
  }
  return false;
}

export const setIsLoggedIn = () => localStorage.setItem("isLoggedIn", "true");

export const numberToVND = (number: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}