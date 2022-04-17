import { BaseAPI } from "api/api";

export const getProductItems = () => {
  return BaseAPI.get("/product/getProduct");
};

export const getItemDetail = (id: string) => {
  return BaseAPI.get("/product/getDetail", { params: { id } });
};
