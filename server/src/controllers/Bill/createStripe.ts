import express from "express";
import { connection } from "../../database/mysql";
const router = express.Router();

const stripe = require("stripe")(
  "sk_test_51KspVPHqVTDfSWC0ruDGqjXUGZNnXQWnLPDExiU0LHq3svYVB8PfvyeckkR87JjpBxdbPnN3h2zJBtTV505iNeHA00csMATPxC"
);

type Products = {
  id: string;
  ten: string;
  gia: number[];
};
const handleItemStripe = (products: Products[], amount: number[]) => {
  return products.map((item, index) => {
    const { ten, gia } = item;
    const itemStripe = {
      price_data: {
        currency: "vnd",
        product_data: {
          name: ten,
        },
        unit_amount: gia[0],
      },
      quantity: amount[index],
    };
    return itemStripe;
  });
};
export const createStripe = () => {
  return router.post(
    "/",
    async (req: express.Request, res: express.Response) => {
      const { products, amount } = req.body;
      const newItem = handleItemStripe(products, amount);
      try {
        const session = await stripe.checkout.sessions.create({
          line_items: newItem,

          mode: "payment",
          success_url: "http://localhost:3000/payment/success",
          cancel_url: "http://localhost:3000/payment/cancel",
        });

        res.json({ url: session.url });
      } catch (error) {
        res.json({
          status: 400,
          body: error,
        });
      }
    }
  );
};
