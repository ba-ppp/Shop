/** @jsxImportSource @emotion/react */
import "twin.macro";
import React from "react";

export const Suggestion = () => {
  return (
    <div tw='flex-col'>
      <div
      tw='h-56 w-56 bg-contain bg-center bg-no-repeat'
        style={{
          backgroundImage: `url('${
            process.env.PUBLIC_URL + "/images/airpod.webp"
          }')`,
        }}
      />
      <div tw='text-sm leading-6'>Airpods Pro Hộp sạc không dây</div>
      <div tw='font-bold'>4.990.000đ</div>
    </div>
  );
};
