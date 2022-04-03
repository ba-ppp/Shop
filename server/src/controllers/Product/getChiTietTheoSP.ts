import express from "express";
import { connection } from "../../database/mysql";

const router = express.Router();

export const getChiTietSP = () => {
    return router.post(
        "/",
        async (req: express.Request, res: express.Response) => {
          try {
            const {id_sp} = req.body;
            const sql = "select * from chi_tiet_sp where id_sp = ?;";
            connection.query(sql, [id_sp], function (err, results) {
              if (err) throw err;
              res.json(results);
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