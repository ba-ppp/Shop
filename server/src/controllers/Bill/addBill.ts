import express from "express";
import { connection } from "../../database/mysql";
import { v4 } from "uuid";

const router = express.Router();
export const insertBill = async (
  products: [],
  phone: string,
  name: string,
  address: string
) => {
  const uid = v4();
  const sql = "call addBill (?,?,?,?)";
  const sql1 = "call addCTBill(?,?,?,?,?)";
  try {
    const rs = await new Promise((resolve, reject) => {
      connection.query(sql, [uid, phone, name, address], (err) => {
        if (err) console.log('err', err)
        resolve(true);
      });
    });
    if (rs) {
      
      const rs1 = await Promise.all(
        products.map(({ id, dungLuong, mau, amount }) => {
          return new Promise((resolve, reject) => {
            connection.query(sql1, [id, dungLuong, mau, amount, uid], (err) => {
              if (err) console.log('err', err)
              resolve(true);
            });
          });
        })
      );
      if (rs1) {
        return true;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const addBill = () => {
  return router.post(
    "/",
    async (req: express.Request, res: express.Response) => {
      try {
        const { products, phone, name, address } = req.body;
        const status = insertBill(products, phone, name, address);
        console.log('status', status)

        status.then((result) => {
          if (result) {
            res.json({
              status: 200,
              body: "success",
            });
          } else {
            res.json({ status: 500, body: "failed" });
          }
        });
      } catch (error) {
        res.json({
          status: 400,
          body: error,
        });
      }
    }
  );
};
