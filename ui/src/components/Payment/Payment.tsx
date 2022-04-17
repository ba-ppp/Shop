/** @jsxImportSource @emotion/react */
import "twin.macro";
import React from "react";
import { PaymentItem } from "./PaymentItem";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { isEmpty } from "lodash";

export const Payment = () => {
  const [data, setData] = useState([]);
  const [cities, setCities] = useState<string[]>([]);

  const handleGetProvinde = async () => {
    const response = await axios.get(
      "https://provinces.open-api.vn/api/?depth=2"
    );
    setData(response.data);
  };

  useEffect(() => {
    handleGetProvinde();
  }, []);

  useEffect(() => {
    if (!isEmpty(data)) {
      const cityList: string[] = [];
      data.forEach((item: any) => {
        cityList.push(item.name);
      });
      setCities(cityList);
    }
  }, [data]);

  const handlePayment = () => {
    // const payload = {
    //   products: [
    //     {
    //       id: '13promax',
    //       amount: 2,
    //       rom: '256gb',
    //       color: 'Vàng Đồng',
    //     }
    //   ],
    //   phone: '0987654321',
    //   name: 'Nguyễn Văn A',
    //   address: ''
    // };
  };

  return (
    <div tw="mt-16 mb-10 ml-auto mr-auto width[70%]">
      <h1 tw="text-xl text-style-purple-1 font-bold mb-5 w-1/2 ml-auto">
        Giỏ Hàng
      </h1>

      <PaymentItem />
      <div tw="flex w-1/2 m-auto justify-between p-3">
        <div tw="">Tạm tính (5 sản phẩm):</div>
        <div>2.000.000đ</div>
      </div>
      <div tw="w-1/2 m-auto justify-between p-3">
        <div tw="mb-3">Thông tin khách hàng</div>
        <div tw="flex space-x-10">
          <input
            tw="border p-2 rounded-xl width[261px] height[50px]"
            type="text"
            placeholder="Họ và tên: "
          />
          <input
            tw="border p-2 rounded-xl width[261px] height[50px]"
            type="text"
            placeholder="Số điện thoại: "
          />
        </div>
      </div>
      <div tw="w-1/2 m-auto justify-between p-3">
        <div>Chọn hình thức nhận hàng</div>
        <div></div>
      </div>
      <div tw="w-1/2 m-auto justify-between p-3 flex">
        <div>Tổng tiền:</div>
        <div tw="text-style-purple-1">6.000.000đ</div>
      </div>
      <div
        onClick={handlePayment}
        tw=" text-xl text-center rounded-xl w-1/2 m-auto justify-between p-3 border border-style-purple-1 bg-style-purple-1 text-white font-bold"
      >
        Đặt hàng
      </div>
    </div>
  );
};
