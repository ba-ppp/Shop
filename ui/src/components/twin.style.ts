import { css } from "@emotion/react";

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
