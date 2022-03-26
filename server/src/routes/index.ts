
import { serverInit } from 'config/config';
import { Login } from 'controllers/Auth/Login/Login';
import { getProduct } from 'controllers/Product/getProduct';
import { Detail } from 'controllers/Product/getDetail';
import express from 'express';

const app = express();

export const routes = () => {
    serverInit(app);

    app.use("/auth/signin", Login());
    app.use("/Product/getProduct", getProduct());
    app.use("/Product/getDetail", Detail());
}