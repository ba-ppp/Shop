import { BaseAPI } from 'api/api';

export const postPayment = (items: any) => {
    return BaseAPI.post("/bill/addBill", items);
  };