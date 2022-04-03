import express from "express";
import { connection } from "../../database/mysql";

const router = express.Router();

export const getProduct = () => {
  return router.get(
    "/",
    async (req: express.Request, res: express.Response) => {
      try {
        let data = {
          idHang: "",
          tenHang: "",
          loai: [] as any,
        };
        const resultsData: any = [];
        const sql =
          "select * from hang h join loai l on h.id_hang = l.id_hang join san_pham s on l.id_loai = s.id_loai join chi_tiet_sp c on s.id_sp = c.id_sp group by ten_sp;";
        connection.query(sql, function (err, results) {
          if (err) throw err;
          let idHang = results[0].id_hang;
          let idLoai = results[0].id_loai;

          results.forEach((item: any) => {
            if (item.id_hang === idHang) {
              data.idHang = item.id_hang;
              data.tenHang = item.ten_hang;
              
                data.loai.push({
                  idLoai: item.id_loai,
                  tenLoai: item.ten_loai,
                  product: {
                    idSp: item.id_sp,
                    tenSP: item.ten_sp,
                    giaSp: item.gia,
                    anhSp: item.img,
                  },
                });
               
            } else {
              resultsData.push(data);
              idHang = item.id_hang;
              idLoai = item.id_loai;
              const newData = {
                idHang: item.id_hang,
                tenHang: item.ten_hang,
                loai: {
                  id_loai: item.id_loai,
                  ten_loai: item.ten_loai,
                  products: {
                      idSp: item.id_sp,
                      tenSP: item.ten_sp,
                      giaSp: item.gia,
                      anhSp: item.img,
                    }
                }
              };
              data = { ...newData };
            };
          });
          resultsData.push(data);
          res.json(resultsData);
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
