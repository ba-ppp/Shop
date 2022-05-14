import { BaseAPI } from "api/api";

export const postPayment = (items: any) => {
  return BaseAPI.post("/bill/addBill", items);
};

export const createStripe = (items: any) => {
  return BaseAPI.post("/create-checkout-session", items);
};

export const payMomo = (payload: any) => {
  return BaseAPI.post("/pay/momo", payload);
};

export const checkMomo = (payload: any) => {
  return BaseAPI.post("/pay/checkMomo", payload);
};

export const getHistoryPayment = (payload: { sdt: string }) => {
  return BaseAPI.get("/customer/historyBuy", { params: payload });
};
