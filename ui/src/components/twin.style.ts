import { css } from "@emotion/react";
import tw, { TwStyle } from 'twin.macro';

export const svgHoverShadow = (dropShadow: number) => css`
  -webkit-filter: drop-shadow(
    1px 1px 1px rgba(0, 0, 0, ${dropShadow})
  ) !important;
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, ${dropShadow})) !important;
`;

export const color = {
  purple_1: "#9B99FF",
  purple_2: "#5551FF",
  purple_3: "#211FCC",
  purple_4: "#201F66",
};

export const colorBorder: { [key: string]: TwStyle } = {
  blue: tw`text-blue-500! hover:bg-blue-300 border-blue-400!`,
  purple: tw`text-style-purple-2! hover:bg-style-purple-1! border-style-purple-2!`,
  red: tw`text-red-700! hover:bg-red-200! border-red-400! active:bg-red-400! focus:bg-red-200!`,
  yellow: tw`text-yellow-500! hover:bg-yellow-300! border-yellow-400! active:bg-yellow-400! focus:bg-yellow-200!`,
  green: tw`text-green-500! hover:bg-green-300! border-green-400! active:bg-green-400! focus:bg-green-200!`,
  gray: tw`text-gray-500! hover:bg-gray-300! border-gray-400! active:bg-gray-400! focus:bg-gray-200!`,
  pink: tw`text-pink-500! hover:bg-pink-300! border-pink-400! active:bg-pink-400! focus:bg-pink-200!`,
  black: tw`text-black! hover:bg-black! border-black! active:bg-black! focus:(bg-black text-white)!`,
  white: tw`text-black!`,
};

export const colorBg: { [key: string]: TwStyle } = {
  blue: tw`bg-blue-500!`,
  purple: tw`bg-style-purple-1!`,
  red: tw`bg-red-200!`,
  yellow: tw`bg-yellow-300!`,
  green: tw`bg-green-300!`,
  gray: tw`bg-gray-300!`,
  pink: tw`bg-pink-300!`,
  black: tw`bg-black!`,
  white: tw`bg-white!`,
}