import express from "express";
import { connection } from "../../database/mysql";

const router = express.Router();

export const getLoai = () => {
    return router.post(
        "/",
        async (req: express.Request, res: express.Response) => {
          try {
            const { id_hang } = req.body;
            const sql = "select ten_loai from loai where id_hang=?";
            connection.query(sql, [id_hang], function (err, results) {
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