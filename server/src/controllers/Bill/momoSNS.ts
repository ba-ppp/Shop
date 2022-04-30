import express from "express";
import { v4 } from "uuid";
import { connection } from "../../database/mysql";
import axios from "axios";
const router = express.Router();
const sha256 = require("js-sha256").sha256;

export const momoSNS = () => {
  router.post(
    "/momo",
    async (req: express.Request, res: express.Response) => {
      const { amount } = req.body;
      const amountString = (amount / 1000).toString();
      const requestId = v4();
      const orderId = v4();
      const payload: any = {
        accessKey: "VK9in7lVWnI2HcRZ",
        amount: amountString,
        extraData: "",
        ipnUrl: "http://localhost:8080/momo/notification",
        orderId,
        orderInfo: "Muadt",
        partnerCode: "MOMOVN6L20220429",
        redirectUrl: "http://localhost:3000/payment",
        requestId,
        requestType: "captureWallet",
      };

      const stringToHash = `accessKey=VK9in7lVWnI2HcRZ&amount=${amountString}&extraData=&ipnUrl=http://localhost:8080/momo/notification&orderId=${orderId}&orderInfo=Muadt&partnerCode=MOMOVN6L20220429&redirectUrl=http://localhost:3000/payment&requestId=${requestId}&requestType=captureWallet`;;
      const myHash = sha256.hmac(
        "mkU3vhIpVoGlvETXuKqJEeFzZFWEZyZu",
        stringToHash
      );
      payload["signature"] = myHash;
      console.log('payload', payload)
      const response = await axios.post(
        "https://test-payment.momo.vn/v2/gateway/api/create",
        payload
      );
      res.json({
        data: response.data,
      });
      try {
      } catch (error) {
        res.json({
          status: 400,
          body: error,
        });
      }
    }
  );
  router.post(
    "/checkMomo",
    async (req: express.Request, res: express.Response) => {
      const { orderId, requestId } = req.body;

      const payload: any = {
        accessKey: "VK9in7lVWnI2HcRZ",
        orderId,
        partnerCode: "MOMOVN6L20220429",
        requestId,
      };
      const payloadURL = new URLSearchParams(payload);
      const payloadString = payloadURL.toString();
      const myHash = sha256.hmac(
        "mkU3vhIpVoGlvETXuKqJEeFzZFWEZyZu",
        payloadString
      );
      payload["signature"] = myHash;
      const response = await axios.post(
        "https://test-payment.momo.vn/v2/gateway/api/query",
        payload
      );
      res.json({
        data: response.data,
      });
      try {
      } catch (error) {
        res.json({
          status: 400,
          body: error,
        });
      }
    }
  );
  return router;
};

// export const checkMomo = () => {
//   return 
// }
