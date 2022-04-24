/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource @emotion/react */
import "twin.macro";
import React from "react";
import { PaymentItem } from "./PaymentItem";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/reducer/reducer";
import { useEffectOnce } from "react-use";
import { getItemFromLocalStorage, numberToVND } from "utils/utils";
import { addArrayCartItems, addCartItem } from "app/slices/carts.slice";
import { postPayment } from "services/payment.service";

export const Payment = () => {
  const [data, setData] = useState([]);
  const [cities, setCities] = useState<string[]>([]);
  const [prices, setPrices] = useState(0);
  const [options, setOptions] = useState({
    shipHome: true,
    shipStore: false,
  });
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const cart = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();

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

  const handleClickChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const name = e.target.name;
    const newOptions = {
      shipHome: false,
      shipStore: false,
      [name]: checked,
    };
    setOptions(newOptions);
  };

  const handlePayment = async () => {
    const payload = {
      products: cart.items,
      phone,
      name,
      address: "",
    };
    await postPayment(payload);
  };

  const getTotalPrice = () => {
    let total = 0;
    cart.items.forEach((item) => {
      total += item.gia[0];
    });
    setPrices(total);
  };

  useEffect(() => {
    getTotalPrice();
  }, [cart.items]);

  return (
    <div tw="mt-16 mb-10 ml-auto mr-auto width[70%]">
      <h1 tw="text-xl text-style-purple-1 font-bold mb-5 w-1/2 ml-auto">
        Giỏ Hàng
      </h1>
      {cart.items.map((item) => {
        return <PaymentItem item={item} />;
      })}
      <div tw="flex w-1/2 m-auto justify-between p-3">
        <div tw="">Tạm tính ({cart.items.length} sản phẩm):</div>
        <div>{numberToVND(prices)}</div>
      </div>
      <div tw="w-1/2 m-auto justify-between p-3">
        <div tw="mb-3">Thông tin khách hàng</div>
        <div tw="flex space-x-10">
          <input
            tw="border p-2 rounded-xl width[261px] height[50px]"
            type="text"
            placeholder="Họ và tên: "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            tw="border p-2 rounded-xl width[261px] height[50px]"
            type="text"
            placeholder="Số điện thoại: "
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div tw="w-1/2 m-auto justify-between p-3">
        <div>Chọn hình thức nhận hàng</div>
        <div tw="flex items-center space-x-20">
          <div tw="flex items-center">
            <input
              tw="(width[2rem] height[16px] accent-color[#5451f6] cursor-pointer)!"
              type="radio"
              name="shipHome"
              checked={options.shipHome}
              id=""
              onChange={handleClickChecked}
            />
            <span>Giao tận nơi</span>
          </div>
          <div tw="flex items-center">
            <input
              tw="(width[2rem] height[16px] accent-color[#5451f6] cursor-pointer)!"
              type="radio"
              name="shipStore"
              checked={options.shipStore}
              onChange={handleClickChecked}
            />
            <span>Nhận tại cửa hàng</span>
          </div>
        </div>
      </div>
      <div tw="w-1/2 m-auto justify-between p-3 flex">
        <div>Tổng tiền:</div>
        <div tw="text-style-purple-1">6.000.000đ</div>
      </div>
      <div
        onClick={handlePayment}
        tw=" text-xl text-center rounded-xl w-1/2 m-auto justify-between p-3 border border-style-purple-1 bg-style-purple-1 text-white font-bold cursor-pointer"
      >
        Đặt hàng
      </div>
    </div>
  );
};
