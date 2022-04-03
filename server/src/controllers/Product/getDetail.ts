import express from "express";
import { connection } from "../../database/mysql";

const router = express.Router();

export const Detail = () => {
  return router.post(
    "/",
    async (req: express.Request, res: express.Response) => {
      try {
        const { idSp } = req.body;
        const resultsData: any = [];
        let data = {
          tenSp: "",
          giaSp: [] as any,
          dungLuong: [] as any,
          mauSp: [] as any,
          anhSp: [] as any,
          thongTin: {
            manHinh: {
              congNghe: "",
              doPhanGiai: "",
              rong: "",
              doSang: "",
              matKinh: ""
            },
            camera: {
              sau: "",
              denFlash: "",
              truoc: ""
            },
            system: {
              os: "",
              cpu: "",
              gpu: "",
              ram: "",
              rom: ""
            },
            ketNoi: {
              mang: "",
              sim: "",
              wifi: "",
              bluetooth: "",
              congSac: "",
              khac: ""
            },
            pin: {
              dungLuong: "",
              loai: "",
              tocDoSac: "",
              congNghe: ""
            }
          }
        };
        const sql =
          "select * from  san_pham s join chi_tiet_sp c on s.id_sp = c.id_sp where s.id_sp = ?";
        const sql1 =
          "select * from san_pham s join mau_sac m on s.id_sp = m.id_sp where s.id_sp = ?";
        const sql2 =
          "select * from san_pham s join thong_tin t on t.id_tt = s.id_tt where s.id_sp = ?";
        connection.query(sql, [idSp], function (err, results) {
          if (err) throw err;
          results.forEach((item: any) => {
            data.tenSp = item.ten_sp,
            data.giaSp.push(item.gia),
            data.dungLuong.push(item.dung_luong);
          });
        });
        connection.query(sql1, [idSp], function (err, results) {
          if (err) throw err;
          results.forEach((item: any) => {
            data.mauSp.push(item.mau);
            data.anhSp.push(item.anh);
          });
        });
        connection.query(sql2, [idSp], function (err, results) {
          if (err) throw err;
          results.forEach((item: any) => {
            data.thongTin.manHinh.congNghe = item.cn_man;
            data.thongTin.manHinh.doPhanGiai = item.do_phan_giai;
            data.thongTin.manHinh.rong = item.kich_thuoc;
            data.thongTin.manHinh.doSang = item.do_sang;
            data.thongTin.manHinh.matKinh = item.mat_kinh;
            data.thongTin.camera.sau = item.camera_sau;
            data.thongTin.camera.denFlash = item.den_flash;
            data.thongTin.camera.truoc = item.camera_truoc;
            data.thongTin.system.os = item.he_dieu_hanh;
            data.thongTin.system.cpu = item.cpu;
            data.thongTin.system.gpu = item.gpu;
            data.thongTin.system.ram = item.ram;
            data.thongTin.system.rom = data.dungLuong.toString();
            data.thongTin.ketNoi.mang = item.mang_di_dong;
            data.thongTin.ketNoi.sim = item.sim;
            data.thongTin.ketNoi.wifi = item.wifi;
            data.thongTin.ketNoi.bluetooth = item.bluetooth;
            data.thongTin.ketNoi.congSac = item.cong_sac;
            data.thongTin.ketNoi.khac = item.ket_noi_khac;
            data.thongTin.pin.dungLuong = item.dung_luong_pin;
            data.thongTin.pin.loai = item.loai_pin;
            data.thongTin.pin.tocDoSac = item.toc_do_sac;
            data.thongTin.pin.congNghe = item.cong_nghe_pin;
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
