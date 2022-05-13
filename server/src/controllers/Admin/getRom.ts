import { catchError } from "controllers/utils/utils";
import express from "express";
import { connection } from "../../database/mysql";

const router = express.Router();

export const getRom = () => {
  return router.get(
    "/",
    async (req: express.Request, res: express.Response) => {
      try {
        const {id} = req.body;
        const resultsData: any = [];
        let data = {
          id: "",
          ten: "",
          gia: [] as any,
          dungLuong: [] as any,
        };
        const sql =
          "select * from san_pham s join chi_tiet_sp c on s.id_sp = c.id_sp where s.id_sp = ?";
        connection.query(sql, [id], function (err, results) {
          if (err) throw err;
          results.forEach((item: any) => {
            data.id = item.id_sp;
            data.ten = item.ten_sp,
            data.gia.push(item.gia),
            data.dungLuong.push(item.dung_luong);
          });
          resultsData.push(data);
          res.json(resultsData[0]);
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
