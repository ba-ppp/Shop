/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource @emotion/react */
import "twin.macro";
import React from "react";
import { PaymentItem } from "./PaymentItem";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { has, isEmpty, mapValues } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/reducer/reducer";
import { numberToVND } from "utils/utils";
import {
  checkMomo,
  createStripe,
  payMomo,
  postPayment,
} from "services/payment.service";
import { customToast } from "components/Utils/toast.util";
import { useHistory, useParams } from "react-router-dom";

import { ReactComponent as Stripe } from "asset/icons/stripe.svg";
import Momo from "asset/images/momo_logo.png";
import { StatusCode } from "models/enums";
import { useSearchParam } from "react-use";
import { clearCartItems } from "app/slices/carts.slice";

export const Payment = () => {
  const [data, setData] = useState([]);

  const { status }: any = useParams();

  const history = useHistory();

  const dispatch = useDispatch();

  const [cities, setCities] = useState<string[]>([]);
  const [prices, setPrices] = useState(0);

  const [shipOptions, setShipOptions] = useState({
    shipHome: true,
    shipStore: false,
  });
  const [payOptions, setPayOptions] = useState({
    payCash: true,
    payMomo: false,
    payStripe: false,
  });

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const cart = useSelector((state: RootState) => state.cart);

  const handleGetProvinde = async () => {
    const response = await axios.get(
      "https://provinces.open-api.vn/api/?depth=2"
    );
    setData(response.data);
  };

  useEffect(() => {
    (async () => {
      const url = window.location.href;

      const paramsString = url.split("?")[1];
      const searchParams = new URLSearchParams(paramsString);
      if (
        searchParams.has("partnerCode") &&
        searchParams.has("partnerCode") &&
        searchParams.has("requestId")
      ) {
        const payload = {
          partnerCode: searchParams.get("partnerCode")!,
          orderId: searchParams.get("orderId")!,
          requestId: searchParams.get("requestId")!,
        };
        const res = await checkMomo(payload);
        if (res.data) {
          const { data } = res.data;

          if (data?.resultCode === 0 && data?.message.includes("Successful")) {
            customToast.success("Thanh toán thành công");
            await handleClearPayment();
          }
        }
      }
    })();
  }, [window.location.href]);

  useEffect(() => {
    // stripe
    (async () => {
      if (status === "success") {
        customToast.success("Thanh toán thành công");
        await handleClearPayment();
      }
    })();
  }, [status]);

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

  const handleClickChecked = (
    e: React.ChangeEvent<HTMLInputElement>,
    options: any
  ) => {
    const checked = e.target.checked;
    const name = e.target.name;
    const newOptions = mapValues(options, () => false);
    newOptions[name] = checked;
    if (has(newOptions, "shipHome")) {
      setShipOptions(newOptions as any);
    } else {
      setPayOptions(newOptions as any);
    }
  };

  const handleClearPayment = async () => {
    const payload = {
      products: cart.items.map((i, index) => {
        return {
          ...i,
          amount: cart.amount[index],
          dungLuong: i.dungLuong[0],
          mau: cart.color?.[index] ?? i.mau[0],
        };
      }),
      phone,
      name,
      address: "",
    };
    await postPayment(payload);
    history.push("/payment");
    dispatch(clearCartItems());
  };

  const handlePayment = async () => {
    if (isEmpty(name)) {
      customToast.error("Vui lòng nhập họ tên");
      return;
    }
    if (isEmpty(phone)) {
      customToast.error("Vui lòng nhập số điện thoại");
      return;
    }

    const payload = {
      products: cart.items,
      phone,
      name,
      address: "",
      amount: cart.amount,
    };

    if (payOptions.payStripe) {
      const res = await createStripe(payload);
      const body = await res.data;
      window.location.href = body.url;
      return;
    }

    if (payOptions.payMomo) {
      const res = await payMomo({
        amount: prices,
      });
      if (res.status === StatusCode.OK) {
        const { data } = res.data;
        window.location.href = data.payUrl;
        return;
      }
    }
    await handleClearPayment();
    customToast.success("Đã đặt hàng thành công");
  };

  const getTotalPrice = () => {
    let total = 0;
    cart.items.forEach((item, index) => {
      total += item.gia[0] * cart.amount[index];
    });
    setPrices(total);
  };

  useEffect(() => {
    getTotalPrice();
  }, [cart.items, cart.amount]);

  return (
    <div tw="mt-16 mb-10 ml-auto mr-auto width[70%]">
      <h1 tw="text-xl text-style-purple-1 font-bold mb-5 w-1/2 ml-auto">
        Giỏ Hàng
      </h1>
      {cart.items.map((item, index) => {
        return <PaymentItem item={item} index={index} />;
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
              checked={shipOptions.shipHome}
              id=""
              onChange={(e) => handleClickChecked(e, shipOptions)}
            />
            <span>Giao tận nơi</span>
          </div>
          <div tw="flex items-center">
            <input
              tw="(width[2rem] height[16px] accent-color[#5451f6] cursor-pointer)!"
              type="radio"
              name="shipStore"
              checked={shipOptions.shipStore}
              onChange={(e) => handleClickChecked(e, shipOptions)}
            />
            <span>Nhận tại cửa hàng</span>
          </div>
        </div>
      </div>
      <div tw="w-1/2 m-auto justify-between p-3 flex">
        <div>Tổng tiền:</div>
        <div tw="text-style-purple-1">6.000.000đ</div>
      </div>
      <div tw="w-1/2 m-auto justify-between p-3">
        <div>Chọn hình thức thanh toán</div>
        <div tw="flex items-center space-x-20">
          <div tw="flex items-center">
            <input
              tw="(width[2rem] height[16px] accent-color[#5451f6] cursor-pointer)!"
              type="radio"
              name="payCash"
              checked={payOptions.payCash}
              id=""
              onChange={(e) => handleClickChecked(e, payOptions)}
            />

            <span>Tiền mặt</span>
          </div>
          <div tw="flex items-center">
            <input
              tw="(width[2rem] height[16px] accent-color[#5451f6] cursor-pointer)!"
              type="radio"
              name="payStripe"
              checked={payOptions.payStripe}
              id=""
              onChange={(e) => handleClickChecked(e, payOptions)}
            />

            <Stripe width={48} height={48} />
          </div>
          <div tw="flex items-center">
            <input
              tw="(width[2rem] height[16px] accent-color[#5451f6] cursor-pointer)!"
              type="radio"
              name="payMomo"
              checked={payOptions.payMomo}
              onChange={(e) => handleClickChecked(e, payOptions)}
            />
            <div>
              <img src={Momo} width={48} height={48} />
            </div>
          </div>
        </div>
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
