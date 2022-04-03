import express from "express";
import { connection } from "../../database/mysql";

const router = express.Router();

export const getProduct = () => {
  return router.get(
    "/",
    async (req: express.Request, res: express.Response) => {
      try {
        let data = {
          id: "",
          ten: "",
          loai: {
            id: "",
            ten: "",
            products: [] as any,
          },
        };
        const resultsData: any = [];
        const sql =
          "select * from hang h join loai l on h.id_hang = l.id_hang join san_pham s on l.id_loai = s.id_loai join chi_tiet_sp c on s.id_sp = c.id_sp join mau_sac m on s.id_sp = m.id_sp group by ten_sp;";

        connection.query(sql, function (err, results) {
          if (err) throw err;

          results.forEach((item: any) => {
            let idHang = results[0].id_hang;
            let idLoai = results[0].id_loai;
            if (item.id_hang === idHang) {
              data.id = item.id_hang;
              data.ten = item.ten_hang;

              if (item.id_loai !== idLoai) {
                (data.loai.id = item.id_loai),
                  (data.loai.ten = item.ten_loai),
                  data.loai.products.push({
                    id: item.id_sp,
                    ten: item.ten_sp,
                    gia: item.gia,
                    anh: item.anh,
                  });
              
              }
            } else {
              resultsData.push(data);
              idHang = item.id_hang;
              idLoai = item.id_loai;
              const newData = {
                id: item.id_hang,
                ten: item.ten_hang,
                loai: {
                  id: item.id_loai,
                  ten: item.ten_loai,
                  products: {
                    id: item.id_sp,
                    ten: item.ten_sp,
                    gia: item.gia,
                    anh: item.anh,
                  },
                },
              };
              data = { ...newData };
            }
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
