import express from "express";
import { connection } from "../../database/mysql";

const router = express.Router();

export const getAllProduct = () => {
    return router.get(
        "/",
        async (req: express.Request, res: express.Response) => {
          try {
            
            const sql = "select * from product join detail on product.id_detail = detail.id_detail join category on detail.id_category = category.id_category order by detail.name_detail asc;";
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