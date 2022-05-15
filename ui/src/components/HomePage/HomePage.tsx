import { ReactComponent as Background } from "asset/images/home-page-logo.svg";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
/** @jsxImportSource @emotion/react */
import "twin.macro";

export const HomePage = () => {
  const history = useHistory();

  const handleClickBuy = () => {
    history.push(`/shop`);
  };

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://unpkg.com/typer-dot-js@0.1.0/typer.js";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return (
    <div tw="py-16 px-4">
      <div tw="flex items-center justify-center">
        <div tw="w-1/3">
          <Background height={450} width={450} />
        </div>

        <div tw="w-1/3">
          <h1 tw="font-bold text-5xl width[500px] text-gray-900 leading-tight">
            Chúng tôi có các sản phẩm của{" "}
            <span
              className="typer"
              data-colors="#211FCC"
              id="main"
              data-words="Apple.,Samsung.,Oppo.,Xiaomi.,Vivo."
              data-delay="100"
              data-deletedelay="1000"
            >
              Apple
            </span>
            <span
              tw="text-style-purple-2"
              className="cursor"
              data-cursordisplay="|"
              data-owner="main"
              style={{ transition: "all 0.1s ease 0s", opacity: "1" }}
            >
              |
            </span>
          </h1>
          <hr tw="w-24 h-1 bg-style-purple-3 rounded-full mt-8 ml-0 mb-10"></hr>
          <div tw="flex mx-auto width[50%]">
            <button
              onClick={handleClickBuy}
              tw="text-xl bg-style-purple-2 hover:bg-style-purple-3 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Ghé thăm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
