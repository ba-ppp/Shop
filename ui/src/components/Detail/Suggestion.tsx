/** @jsxImportSource @emotion/react */
import "twin.macro";
import React from "react";
import { ProductSuggestion } from "models/utils.model";
import { numberToVND } from 'utils/utils';

type Props = {
  item: ProductSuggestion;
};

export const Suggestion = (props: Props) => {
  const { item } = props;
  return (
    <div tw="flex-col cursor-pointer">
      <div
        tw="h-56 w-56 bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${
            process.env.PUBLIC_URL + "/images/" + item.anh
          }')`,
        }}
      />
      <div tw="text-sm leading-6">{item.ten}</div>
      <div tw="font-bold">{numberToVND(item.gia)}</div>
    </div>
  );
};
