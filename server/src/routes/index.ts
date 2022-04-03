
import { serverInit } from 'config/config';
import { Login } from 'controllers/Auth/Login/Login';
import { getChiTietSP } from 'controllers/Product/getChiTietTheoSP';
import { getDSHang } from 'controllers/Product/getDSHang';
import { getLoai } from 'controllers/Product/getDSLoaiTheoHang';
import { getDSSP } from 'controllers/Product/getDSSPTheoLoai';
import express from 'express';

const app = express();

export const routes = () => {
    serverInit(app);

    app.use("/auth/signin", Login());
    app.use("/Product/getDSHang", getDSHang());
    app.use("/Product/getDSLoaiTheoHang", getLoai());
    app.use("/Product/getDSSPTheoLoai", getDSSP());
    app.use("/Product/getChiTietTheoSP", getChiTietSP());
}