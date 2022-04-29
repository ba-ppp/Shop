import { BaseAPI } from 'api/api';

export const postPayment = (items: any) => {
    return BaseAPI.post("/bill/addBill", items);
  };

export const createStripe = (items: any) => {
  return BaseAPI.post('/create-checkout-session', items)
} 