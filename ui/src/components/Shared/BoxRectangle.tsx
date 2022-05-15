/** @jsxImportSource @emotion/react */
import React from "react";
import tw from "twin.macro";

type Props = {
  capacity: string;
  index: number;
  handleClickBox: (index: number) => void;
  currentIndex: number;
};
const style = {
  capacity_box: tw`w-16 h-10 border rounded-xl flex items-center justify-center cursor-pointer`,
  selected: tw`bg-style-purple-2 text-white`,
};

export const BoxRectangle = (props: Props) => {
  const { capacity, index, handleClickBox, currentIndex } = props;
  return (
    <div
      onClick={() => handleClickBox(index)}
      css={[style.capacity_box, currentIndex === index && style.selected]}
    >
      {capacity}
    </div>
  );
};
