/** @jsxImportSource @emotion/react */
import React from "react";
import "twin.macro";
import { List } from "@rmwc/list";
import { ListDetail } from "./ListDetail";
import { Suggestion } from "./Suggestion";
import { ReactComponent as Phone } from "asset/icons/phone.svg";
import { ReactComponent as Truck } from "asset/icons/truck.svg";
import { ReactComponent as Waranty } from "asset/icons/waranty.svg";
import { ReactComponent as AddToCart } from "asset/icons/add-to-cart.svg";
import { useParams } from "react-router-dom";
import { useEffectOnce } from "react-use";
import { getItemDetail } from "services/product.service";
import { Accessories, ProductDetail, ProductItem } from "models/utils.model";
import { useState } from "react";
import { numberToVND } from "utils/utils";
import { BoxCircle } from "components/Shared/BoxCircle";
import { get, isNil, keys } from "lodash";
import { BoxRectangle } from "components/Shared/BoxRectangle";
import { useDispatch } from "react-redux";
import { addCartItem } from "app/slices/carts.slice";
import { customToast } from "components/Utils/toast.util";

// const boxBackground: { [key: string]: TwStyle } = {
//   white: tw`bg-white border-white`,
//   black: tw`bg-black border-black`,
//   red: tw`bg-red-600 border-red-600`,
// };

type DetailData = {
  anh: string[];
  dungLuong: string[];
  gia: number[];
  id: string;
  mau: string[];
  phuKien: Accessories[];
  ten: string;
  thongTin: ProductDetail;
};

export const Detail = () => {
  const { id }: any = useParams();
  const [data, setData] = useState<DetailData>();
  const [currentPrice, setCurrentPrice] = useState(0);
  const [currentImage, setCurrentImage] = useState("");

  const dispatch = useDispatch();

  useEffectOnce(() => {
    (async () => {
      const response = await getItemDetail(id);
      setData(response.data);
      setCurrentPrice(response.data?.gia?.[0]);
      setCurrentImage(response.data?.anh?.[0]);
    })();
  });

  const handleClickCircleBox = (index: number) => {
    if (isNil(data)) return;

    setCurrentImage(data?.anh?.[index]);
  };

  const handleClickRecBox = (index: number) => {
    if (isNil(data)) return;

    setCurrentPrice(data?.gia?.[index]);
  };

  const handleAddToCart = () => {
    customToast.success("", "Thêm vào giỏ hàng thành công");
    if (isNil(data)) return;
    const item: ProductItem = {
      id: data.id,
      ten: data.ten,
      gia: data.gia,
      anh: data.anh,
      mau: data.mau,
    };
    dispatch(addCartItem(item));
  };
  return (
    <div tw="mt-16 mb-10 ml-64">
      <div tw="flex items-center py-3">
        <div
          tw="height[450px] w-1/2 bg-no-repeat bg-contain bg-center mt-5"
          style={{
            backgroundImage: `url('${
              process.env.PUBLIC_URL + "/images/" + currentImage
            }')`,
          }}
        />

        <div tw="ml-16">
          <div tw="text-4xl font-bold mb-7">{data?.ten}</div>
          <div tw="text-xl font-semibold mb-5">
            Giá: {numberToVND(currentPrice ?? 0)}
          </div>
          <div tw="text-xl font-medium mb-2">Dung lượng</div>
          <div tw="flex space-x-5 mb-2">
            {data?.dungLuong.map((capacity, index) => {
              return (
                <BoxRectangle
                  capacity={capacity}
                  index={index}
                  handleClickBox={handleClickRecBox}
                />
              );
            })}
          </div>

          <div tw="text-xl font-medium mb-2">Màu:</div>
          <div tw="flex space-x-5">
            {data?.mau.map((color, index) => {
              return (
                <BoxCircle
                  color={color}
                  index={index}
                  handleClickBox={handleClickCircleBox}
                />
              );
            })}
          </div>

          <div tw="w-full mt-5">
            <div tw="flex space-x-3 mb-2">
              <Waranty height={28} width={28} />
              <div tw="font-size[16px] font-semibold">
                Bảo hành chính hãng 1 năm
              </div>
            </div>
            <div tw="flex space-x-3 mb-2">
              <Truck height={28} width={28} />
              <div tw="font-size[16px] font-semibold">
                Giao hàng nhanh toàn quốc
              </div>
            </div>
            <div tw="flex space-x-4">
              <Phone height={24} width={24} />
              <div tw="font-size[16px] font-semibold">
                Chăm sóc khách hàng 24/7
              </div>
            </div>
          </div>

          <div tw="mt-5 flex space-x-5">
            <button
              onClick={handleAddToCart}
              tw="bg-style-purple-1 hover:bg-style-purple-2 text-white font-bold py-3 px-4 rounded inline-flex items-center space-x-2"
            >
              <AddToCart fill="white" height={24} width={24} />
              <span>Thêm vào giỏ hàng</span>
            </button>
            <button tw="bg-style-purple-2 px-4 py-3 rounded text-white">
              Mua ngay
            </button>
          </div>
        </div>
      </div>
      <div tw="ml-20 mt-10">
        <div tw="text-2xl font-medium mb-5">Phụ kiện đi kèm gợi ý: </div>
        <div tw="flex space-x-5 items-center justify-around width[90%] mb-10">
          {data?.phuKien.map((accessory, index) => {
            return <Suggestion item={accessory} />;
          })}
        </div>
        <List tw="width[590px] ml-96 space-y-5">
          {keys(data?.thongTin).map((key, index) => {
            return <ListDetail header={key} data={get(data?.thongTin, key)} />;
          })}
        </List>
      </div>
    </div>
  );
};
