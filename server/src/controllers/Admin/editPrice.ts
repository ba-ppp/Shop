import { catchError } from "controllers/utils/utils";
import express from "express";
import { connection } from "../../database/mysql";

const router = express.Router();

export const editPrice = () => {
  return router.post(
    "/",
    async (req: express.Request, res: express.Response) => {
      try {
        const {id,dungLuong,giaMoi} = req.body;
        const sql =
          "update chi_tiet_sp set gia = ? where id_sp = ? and dung_luong=?";
        connection.query(sql, [giaMoi,id,dungLuong], function (err, results) {
          if (err) throw err;
          res.json({
            status: 200,
            body: "success",
          });
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
