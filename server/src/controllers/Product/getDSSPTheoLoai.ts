import express from "express";
import { connection } from "../../database/mysql";

const router = express.Router();

export const getDSSP = () => {
    return router.post(
        "/",
        async (req: express.Request, res: express.Response) => {
          try {
            const {id_loai} = req.body;
            const sql = "select * from san_pham join thong_tin on san_pham.id_tt = thong_tin.id_tt where id_loai = ? order by san_pham.ten_sp asc;";
            connection.query(sql, [id_loai], function (err, results) {
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