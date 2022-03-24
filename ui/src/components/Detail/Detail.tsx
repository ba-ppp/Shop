/** @jsxImportSource @emotion/react */
import React from "react";
import tw, { TwStyle } from "twin.macro";
import { List } from "@rmwc/list";
import { ListDetail } from "./ListDetail";
import { Suggestion } from "./Suggestion";
import { ReactComponent as Phone } from "asset/icons/phone.svg";
import { ReactComponent as Truck } from "asset/icons/truck.svg";
import { ReactComponent as Waranty } from "asset/icons/waranty.svg";
import { ReactComponent as AddToCart } from "asset/icons/add-to-cart.svg";

const boxBackground: { [key: string]: TwStyle } = {
  white: tw`bg-white border-white`,
  black: tw`bg-black border-black`,
  red: tw`bg-red-600 border-red-600`,
};

const style = {
  capacity_box: tw`w-16 h-10 border rounded-xl flex items-center justify-center`,
  color_box: (color: string) => [
    tw`border w-10 h-10 rounded-full`,
    boxBackground[color],
  ],
};

export const Detail = () => {
  return (
    <div tw="mt-16 mb-10 ml-64">
      <div tw="flex items-center py-3">
        <div
          tw="height[450px] w-1/2 bg-no-repeat bg-contain bg-center mt-5"
          style={{
            backgroundImage: `url('${
              process.env.PUBLIC_URL + "/images/iphone.jpg"
            }')`,
          }}
        />
        <div tw="ml-16">
          <div tw="text-4xl font-bold mb-7">iPhone SE (2022)</div>
          <div tw="text-xl font-semibold mb-5">Giá: 12.990.000đ</div>
          <div tw="text-xl font-medium mb-2">Dung lượng</div>
          <div tw="flex space-x-5 mb-2">
            <div css={style.capacity_box}>64GB</div>
            <div css={style.capacity_box}>128GB</div>
            <div css={style.capacity_box}>256GB</div>
          </div>

          <div tw="text-xl font-medium mb-2">Màu:</div>
          <div tw="flex space-x-5">
            <div css={style.color_box("black")}></div>
            <div css={style.color_box("red")}></div>
            <div css={style.color_box("white")}></div>
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
            <button tw="bg-style-purple-1 hover:bg-style-purple-2 text-white font-bold py-3 px-4 rounded inline-flex items-center space-x-2">
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
          <Suggestion />
          <Suggestion />
          <Suggestion />
          <Suggestion />
        </div>
        <List tw="width[590px] ml-96 space-y-5">
          <ListDetail />
          <ListDetail />
          <ListDetail />
          <ListDetail />
        </List>
      </div>
    </div>
  );
};
