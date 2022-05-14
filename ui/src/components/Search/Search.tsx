/** @jsxImportSource @emotion/react */
import "twin.macro";
import React from "react";
import { ReactComponent as SearchBackground } from "asset/images/search-background.svg";
import { useState } from "react";
import { useHistory } from 'react-router-dom';

export const Search = () => {
  const [phone, setPhone] = useState("");

  const history = useHistory();

  const handleSearch = async () => {
    history.push('/history?phone=' + phone);
  };

  return (
    <div tw="w-full height[70vh]">
      <div tw="w-1/3 h-full mx-auto mt-20 text-center border-2 rounded-2xl border-solid shadow-2xl">
        <SearchBackground tw="w-full h-1/2 mx-auto mt-12" />
        <div tw="text-2xl mt-12">Tra cứu thông tin mua hàng</div>
        <input
          style={{
            backgroundImage:
              "url('https://cdn.tgdd.vn/mwgcart/orderhistory/images/icon-phone-blue.png')",
          }}
          tw="pl-14 background-size[14px 21px] background-position[25px 50%] bg-no-repeat border-2 rounded-3xl width[300px] height[50px] mt-6 mb-5 focus:outline-none"
          type="text"
          placeholder="Nhập số điện thoại đặt hàng"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          onClick={handleSearch}
          tw="bg-style-purple-2 hover:bg-style-purple-3 text-white font-bold py-3 px-4 rounded items-center space-x-2 block mx-auto"
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};
