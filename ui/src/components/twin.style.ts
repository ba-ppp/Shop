import { css } from '@emotion/react';

export const svgHoverShadow = (dropShadow: number) => css`
  -webkit-filter: drop-shadow(
    1px 1px 1px rgba(0, 0, 0, ${dropShadow})
  ) !important;
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, ${dropShadow})) !important;
`;