import { catchError } from "controllers/utils/utils";
import express from "express";
import { connection } from "../../database/mysql";

const router = express.Router();

export const historyBuy = () => {
  return router.get(
    "/",
    async (req: express.Request, res: express.Response) => {
      try {
        const {sdt} = req.body;
        const resultsData: any = [];
        let data = {
          sdt: "",
          chiTiet: [] as any
        };
        const sql =
          "select * from bill b join chi_tiet_bill cb on b.id_bill = cb.id_bill join chi_tiet_sp cp on cb.id_chitiet = cp.id_chitiet join mau_sac m on cb.id_mau = m.id_mau join san_pham s on m.id_sp = s.id_sp where b.sdt = ? ";
        connection.query(sql, [sdt], function (err, results) {
          if (err) throw err;
          results.forEach((item: any) => {
            data.sdt = item.sdt;
            data.chiTiet.push({
                hoTen : item.ho_ten,
                diaChi : item.dia_chi,
                ngayMua : item.ngay_lap,
                ten : item.ten_sp,
                anh: item.anh,
                dungLuong : item.dung_luong,
                mau : item.mau,
                gia : item.gia,
                amount : item.amount,
                totalPrice : item.price
            });
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
