import { catchError } from "controllers/utils/utils";
import express from "express";
import { connection } from "../../database/mysql";

const router = express.Router();

export const Detail = () => {
  return router.get(
    "/",
    async (req: express.Request, res: express.Response) => {
      try {
        const id = req.query.id;
        const resultsData: any = [];
        let data = {
          id: "",
          ten: "",
          gia: [] as any,
          dungLuong: [] as any,
          mau: [] as any,
          anh: [] as any,
          thongTin: {
            'Màn hình': {
              'Công nghệ màn hình': "",
              'Độ phân giải': "",
              'Kích thước': "",
              'Độ sáng': "",
              'Mặt kính': "",
            },
            Camera: {
              'Camera sau': "",
              'Đèn flash': "",
              'Camera trước': "",
            },
            'Hệ thống': {
              'Hệ điều hành': "",
              CPU: "",
              GPU: "",
              RAM: "",
              'Bộ nhớ trong': "",
            },
            'Kết nối': {
              'Mạng': "",
              'Hỗ trợ sim': "",
              Wifi: "",
              Bluetooth: "",
              'Cổng sạc': "",
              'Khác': "",
            },
            Pin: {
              'Dung lượng': "",
              'Loại Pin': "",
              'Tốc độ sạc': "",
              'Công nghệ sạc': "",
            },
          },
          phuKien: [] as any,
        };
        const sql =
          "select * from  san_pham s join chi_tiet_sp c on s.id_sp = c.id_sp where s.id_sp = ?";
        const sql1 =
          "select * from san_pham s join mau_sac m on s.id_sp = m.id_sp where s.id_sp = ?";
        const sql2 =
          "select * from san_pham s join thong_tin t on t.id_tt = s.id_tt where s.id_sp = ?";
        const sql3 =
          "select * from hang h join loai l on h.id_hang = l.id_hang join san_pham s on l.id_loai = s.id_loai join chi_tiet_sp c on s.id_sp = c.id_sp join mau_sac m on s.id_sp = m.id_sp where h.id_hang = (select h.id_hang from hang h join loai l on h.id_hang = l.id_hang join san_pham s on l.id_loai = s.id_loai join chi_tiet_sp c on s.id_sp = c.id_sp where s.id_sp = ? group by id_hang) and l.ten_loai = ? group by ten_sp;";

        connection.query(sql, [id], function (err, results) {
          if (err) throw err;
          results.forEach((item: any) => {
            data.id = item.id_sp;
            (data.ten = item.ten_sp),
              data.gia.push(item.gia),
              data.dungLuong.push(item.dung_luong);
          });
        });
        connection.query(sql1, [id], function (err, results) {
          if (err) throw err;
          results.forEach((item: any) => {
            data.mau.push(item.mau);
            data.anh.push(item.anh);
          });
        });
        connection.query(sql2, [id], function (err, results) {
          if (err) throw err;
          results.forEach((item: any) =>{
            data.thongTin['Màn hình']['Công nghệ màn hình'] = item.cn_man;
            data.thongTin['Màn hình']['Độ phân giải'] = item.do_phan_giai;
            data.thongTin['Màn hình']['Kích thước'] = item.kich_thuoc;
            data.thongTin['Màn hình']['Độ sáng'] = item.do_sang;
            data.thongTin['Màn hình']['Mặt kính'] = item.mat_kinh;
            data.thongTin.Camera['Camera sau'] = item.camera_sau;
            data.thongTin.Camera['Đèn flash'] = item.den_flash;
            data.thongTin.Camera['Camera trước'] = item.camera_truoc;
            data.thongTin['Hệ thống']['Hệ điều hành'] = item.he_dieu_hanh;
            data.thongTin['Hệ thống'].CPU = item.cpu;
            data.thongTin['Hệ thống'].GPU = item.gpu;
            data.thongTin['Hệ thống'].RAM = item.ram;
            data.thongTin['Hệ thống']['Bộ nhớ trong'] = data.dungLuong.toString();
            data.thongTin['Kết nối']['Mạng'] = item.mang_di_dong;
            data.thongTin['Kết nối']['Hỗ trợ sim'] = item.sim;
            data.thongTin['Kết nối'].Wifi = item.wifi;
            data.thongTin['Kết nối'].Bluetooth = item.bluetooth;
            data.thongTin['Kết nối']['Cổng sạc'] = item.cong_sac;
            data.thongTin['Kết nối']['Khác'] = item.ket_noi_khac;
            data.thongTin.Pin['Dung lượng'] = item.dung_luong_pin;
            data.thongTin.Pin['Loại Pin'] = item.loai_pin;
            data.thongTin.Pin['Tốc độ sạc'] = item.toc_do_sac;
            data.thongTin.Pin['Công nghệ sạc'] = item.cong_nghe_pin;
          });
          // resultsData.push(data);
          // res.json(resultsData);
        });

        connection.query(sql3, [id, "headphone"], function (err, result) {
          result.forEach((item: any) => {
            data.phuKien.push({
              id: item.id_sp,
              ten: item.ten_sp,
              gia: item.gia,
              anh: item.anh,
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
