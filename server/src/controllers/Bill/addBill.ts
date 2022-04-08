import express from "express";
import { connection } from "../../database/mysql";

const router = express.Router();

function uuid() {
  var temp_url = URL.createObjectURL(new Blob());
  var uuid = temp_url.toString();
  URL.revokeObjectURL(temp_url);
  return uuid.substring(uuid.lastIndexOf('/') + 1); 
}

export const addBill = () => {
  return router.post(
    "/",
    async (req: express.Request, res: express.Response) => {
      try {
        const { id,amount,price,rom,color,totalPrice,phone,name } = req.body;
        const sql =
          "select * from  san_pham s join chi_tiet_sp c on s.id_sp = c.id_sp where s.id_sp = ? and c.dung_luong = ? ";
          const sql1 =
          "select * from  san_pham s join mau_sac m on s.id_sp = m.id_sp where s.id_sp = ? and m.mau= ?";
        const sql2 =
          "call addbill(?,?,?,?,?)";
        connection.query(sql, [id,rom], function (err, result1) {
          if (err) throw err;
          connection.query(sql1, [id,color], function (err, result2) {
            if (err) throw err;
            connection.query(sql2, [uuid(),result1[0].id_chitiet,result2[0].id_mau,amount,price*amount,phone,name], function (err, result3) {
              if (err) throw err;
              if (result3) {
                res.json({
                  status: 200,
                  body: "success",
                });
              } else {
                res.json({ status: 500, body: "failed" });
              }
          });
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
