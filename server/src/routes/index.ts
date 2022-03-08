
import { serverInit } from 'config/config';
import { Login } from 'controllers/Auth/Login/Login';
import { getAllProduct } from 'controllers/Product/getAllProduct';
import express from 'express';

const app = express();

export const routes = () => {
    serverInit(app);

    app.use("/auth/signin", Login());
    app.use("/Product", getAllProduct());
}