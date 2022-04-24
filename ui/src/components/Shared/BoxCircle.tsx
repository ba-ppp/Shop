/** @jsxImportSource @emotion/react */
import { colorBg } from "components/twin.style";
import React from "react";
import tw from "twin.macro";
import { getButtonColorFromVN } from "utils/utils";

type Props = {
  color: string;
  index: number;
  handleClickBox: (index: number) => void;
};

const style = {
  color_box: (color: string) => [
    tw`border w-10 h-10 rounded-full cursor-pointer`,
    colorBg[color],
  ],
};

export const BoxCircle = (props: Props) => {
  const { color, index, handleClickBox } = props;
  return (
    <div
      onClick={() => handleClickBox(index)}
      css={style.color_box(getButtonColorFromVN(color))}
    ></div>
  );
};
