/** @jsxImportSource @emotion/react */
import "twin.macro";
import React from "react";
import { Button } from "@rmwc/button";
import { colorBorder } from "components/twin.style";
import { getButtonColorFromVN } from "utils/utils";
import { isEmpty } from "lodash";

type Props = {
  text: string;
  handleClickColorButton: (index: number) => void;
  index: number;
};
export const CustomButton = (props: Props) => {
  const { text, handleClickColorButton, index } = props;

  return (
    <Button
      css={colorBorder[getButtonColorFromVN(!isEmpty(text) ? text : "Trắng")]}
      outlined
      tw="font-bold font-size[10px]"
      onClick={() => handleClickColorButton(index)}
    >
      <span tw="">{!isEmpty(text) ? text : "Trắng"}</span>
    </Button>
  );
};
