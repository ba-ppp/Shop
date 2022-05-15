/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource @emotion/react */
import "twin.macro";
import React from "react";
import { PaymentItem } from "./PaymentItem";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { has, isEmpty, mapValues, toNumber } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/reducer/reducer";
import { dataToOptions, numberToVND, sleepAsync } from "utils/utils";
import Select from "react-select";
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
import { clearCartItems } from "app/slices/carts.slice";
import { toggleLoading } from "app/slices/toggle.slice";
import Loader from "components/Loader/Loader";

export const Payment = () => {
  const [data, setData] = useState<any>([]);
  const [city, setCity] = useState<any>([]);
  const [district, setDistrict] = useState<any>([]);
  const [ward, setWard] = useState<any>([]);

  const [selectedCity, setSelectedCity] = useState<any>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<any>([]);
  const [selectedWard, setSelectedWard] = useState<any>([]);

  const { status }: any = useParams();

  const history = useHistory();

  const dispatch = useDispatch();

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
  const [address, setAddress] = useState("");

  const cart = useSelector((state: RootState) => state.cart);
  const toggle = useSelector((state: RootState) => state.toggle);

  const fakeSleep = async (milisecond: number) => {
    dispatch(toggleLoading(true));

    await sleepAsync(milisecond);

    dispatch(toggleLoading(false));
  };

  const handleGetProvinde = async () => {
    const response = await axios.get(
      "https://provinces.open-api.vn/api/?depth=3"
    );

    setData(response.data);
    setCity(dataToOptions(response.data, "name"));
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

  const handleAddtoDB = async () => {
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
  };

  const handleClearPayment = async () => {
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

    await handleAddtoDB();

    const payload = {
      products: cart.items,
      phone,
      name,
      address,
      amount: cart.amount,
    };
    if (payOptions.payStripe) {
      const res = await createStripe(payload);
      const body = await res.data;
      window.location.href = body.url;
    }
    await fakeSleep(1500);

    if (payOptions.payMomo) {
      const res = await payMomo({
        amount: prices,
      });
      if (res.status === StatusCode.OK) {
        const { data } = res.data;
        window.location.href = data.payUrl;
      }
      await sleepAsync(1500);
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

  const handleChangeCity = (newValue: any) => {
    const currentCity = data.find(
      (item: any) => item?.codename === newValue?.value
    );
    setSelectedCity(currentCity);
    if (currentCity) {
      setDistrict(dataToOptions(currentCity?.districts, "name"));
    }
  };

  const handleChangeDistrict = (newValue: any) => {
    const currentDistrict = selectedCity?.districts.find(
      (item: any) => item?.codename === newValue?.value
    );
    setSelectedDistrict(currentDistrict);
    if (currentDistrict) {
      setWard(dataToOptions(currentDistrict.wards, "name"));
    }
  };

  const handleChangeWard = (newValue: any) => {
    const currentWard = selectedDistrict?.wards.find(
      (item: any) => item?.codename === newValue?.value
    );
    setSelectedWard(currentWard);
  };

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newAddress =
      value +
      ` ${selectedWard?.name} ${selectedDistrict?.name} ${selectedCity?.name}`;
    setAddress(newAddress);
  };
  useEffect(() => {
    getTotalPrice();
  }, [cart.items, cart.amount]);

  return (
    <div tw="mt-16 mb-10 ml-auto mr-auto width[70%]">
      {toggle.isLoading && (
        <div className="loader__component">
          <Loader />
        </div>
      )}
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
      <div tw="m-auto w-1/2 p-3">
        <div tw="mb-3">Thông tin khách hàng</div>
        <div tw="flex justify-between">
          <input
            tw="border p-2 rounded width[261px] height[40px] focus:outline-none"
            type="text"
            placeholder="Họ và tên: "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            tw="border p-2 rounded width[261px] height[40px] focus:outline-none"
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
      <div tw="w-1/2 mx-auto grid grid-cols-2 grid-rows-2 p-3 border gap-5 rounded-xl">
        <Select
          placeholder="Chọn Tỉnh / Thành"
          options={city}
          onChange={handleChangeCity}
        />
        <Select
          placeholder="Chọn Quận / Huyện"
          options={district}
          onChange={handleChangeDistrict}
        />
        <Select
          placeholder="Chọn Phường / Xã"
          options={ward}
          onChange={handleChangeWard}
        />
        <input
          onChange={handleAddress}
          placeholder="Số nhà, đường"
          tw="border pl-3 rounded border-gray-300 focus:outline-none"
        />
      </div>
      <div tw="w-1/2 m-auto justify-between p-3 flex mt-5">
        <div>Tổng tiền:</div>
        <div tw="text-style-purple-1">{numberToVND(prices)}</div>
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
