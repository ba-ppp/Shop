import express from "express";
import { connection } from "../../database/mysql";

const router = express.Router();

interface ProductDB {
  id_hang: string;
  ten_hang: string;
  img: string;
  id_loai: string;
  ten_loai: string;
  id_sp: string;
  ten_sp: string;
  id_tt: string;
  id_chitiet: string;
  dung_luong: string;
  gia: string;
  id_mau: string;
  mau: string;
  anh: string;
  [key: string]: string;
}

export interface Product {
  id: string;
  ten: string;
  loai: ProductType[];
}

export interface ProductType {
  id: string;
  ten: string;
  products: ProductItem[];
}
export interface ProductItem {
  id: string;
  ten: string;
  moTa: string,
  gia: number[];
  anh: string[];
  mau: string[];
  dungLuong: string[];
  isFavorite?: boolean;
}

const getAllId = (data: ProductDB[], key: string) => {
  const ids = [] as string[];
  data.forEach((item) => {
    if (!ids.includes(item[key])) {
      ids.push(item[key]);
    }
  });
  return ids;
};

const createDataByFirm = (firm: string): Product => {
  return {
    id: firm,
    ten: firm,
    loai: [] as ProductType[],
  };
};

export const getProduct = () => {
  return router.get(
    "/",
    async (req: express.Request, res: express.Response) => {
      try {
        const resultsData: Product[] = [];
        const sql =
          "select * from hang h join loai l on h.id_hang = l.id_hang join san_pham s on l.id_loai = s.id_loai join chi_tiet_sp c on s.id_sp = c.id_sp join mau_sac m on s.id_sp = m.id_sp;";

        connection.query(sql, function (err, results) {
          if (err) throw err;

          const firmIds = getAllId(results, "id_hang");

          firmIds.forEach((firmId) => {
            resultsData.push(createDataByFirm(firmId));
          });

          results.forEach((item: ProductDB) => {
            const foundIndex = resultsData.findIndex(
              (data) => data.id === item.id_hang
            );
            // find firm in result
            if (foundIndex >= 0) {
              const type = resultsData[foundIndex].loai;
              // find type in firm
              const foundTypeIndex = type.findIndex(
                (data) => data.id === item.id_loai
              );
              // if existed => push product
              if (foundTypeIndex >= 0) {
                const product = type[foundTypeIndex].products;
                const foundProductIndex = product.findIndex(
                  (data) => data.id === item.id_sp
                );
                // if product existed => push some details
                if (foundProductIndex >= 0) {
                  const productItem = product[foundProductIndex];
                  if (!productItem.mau.includes(item.mau)) {
                    productItem.mau.push(item.mau);
                  }
                  if (!productItem.dungLuong.includes(item.dung_luong)) {
                    productItem.gia.push(parseInt(item.gia));
                    productItem.dungLuong.push(item.dung_luong);
                  }
                  if (!productItem.anh.includes(item.anh)) {
                    productItem.anh.push(item.anh);
                  }
                  // create new type if not existed
                } else {
                  const productItem: ProductItem = {
                    id: item.id_sp,
                    ten: item.ten_sp,
                    moTa: item.mo_ta,
                    gia: [parseInt(item.gia)],
                    anh: [item.anh],
                    mau: [item.mau],
                    dungLuong: [item.dung_luong],
                  };
                  product.push(productItem);
                }
              }
              // create new product
              else {
                const productType: ProductType = {
                  id: item.id_loai,
                  ten: item.ten_loai,
                  products: [],
                };
                const productItem: ProductItem = {
                  id: item.id_sp,
                  ten: item.ten_sp,
                  moTa: item.mo_ta,
                  gia: [parseInt(item.gia)],
                  anh: [item.anh],
                  mau: [item.mau],
                  dungLuong: [item.dung_luong],
                };
                productType.products.push(productItem);
                type.push(productType);
              }
            }
          });

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
