import express from "express";
import { connection } from "../../database/mysql";

const router = express.Router();

export const getDSHang = () => {
    return router.get(
        "/",
        async (req: express.Request, res: express.Response) => {
          try {
            
            const sql = "select ten_hang from hang";
            connection.query(sql, function (err, results) {
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