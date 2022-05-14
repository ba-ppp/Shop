import { IToken, ProductItem } from "models/utils.model";
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
};

export const setIsLoggedIn = () => localStorage.setItem("isLoggedIn", "true");

export const numberToVND = (number: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

export const getButtonColorFromVN = (text: string) => {
  const lowerText = text.toLowerCase();
  if (["đỏ"].includes(lowerText)) {
    return "red";
  }
  if (["vàng đồng"].includes(lowerText)) {
    return "yellow";
  }
  if (["xanh lá"].includes(lowerText)) {
    return "green";
  }
  if (["xanh dương"].includes(lowerText)) {
    return "blue";
  }
  if (["tím"].includes(lowerText)) {
    return "purple";
  }
  if (["xám", "bạc"].includes(lowerText)) {
    return "gray";
  }
  if (["hồng"].includes(lowerText)) {
    return "pink";
  }
  if (["đen"].includes(lowerText)) {
    return "black";
  }

  return "white";
};

export const addItemToLocalStorage = (value: ProductItem[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(value));
  } catch (ex) {
    console.log("Failed add item", ex);
  }
};

export const getItemFromLocalStorage = () => {
  try {
    const value = localStorage.getItem("cart");
    if (value) return JSON.parse(value);
    return [];
  } catch (ex) {
    console.log("Failed get item", ex);
  }
};

export const stringToDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh' });
}
