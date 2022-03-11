/** @jsxImportSource @emotion/react */
import "@rmwc/card/styles";
import "@rmwc/typography/styles";
import React from "react";
import "twin.macro";
import { CustomCard } from "./CustomCard";

export const Home = () => {
  return (
    <>
      <div tw="ml-64 mt-6 flex">
        <CustomCard />
        <CustomCard />
        <CustomCard />
        <CustomCard />
      </div>
    </>
  );
};
