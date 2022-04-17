/** @jsxImportSource @emotion/react */
import "twin.macro";
import React from "react";
import { Button } from "@rmwc/button";
import { colorBorder } from 'components/twin.style';
import { getButtonColorFromVN } from 'utils/utils';

type Props = {
  text: string;
  handleClickColorButton: (index: number) => void;
  index: number;
}



export const CustomButton = (props: Props) => {
  const { text, handleClickColorButton, index } = props;
  return (
    <Button
      css={colorBorder[getButtonColorFromVN(text)]}
      outlined
      tw="font-bold font-size[10px]"
      onClick={() => handleClickColorButton(index)}
    >
      <span tw="">{text}</span>
    </Button>
  );
};
