/** @jsxImportSource @emotion/react */
import 'twin.macro';
import { css } from '@emotion/react';

import './ToastMessage.scss';
import { ReactComponent as ErrorIcon } from 'assets/Icons/error_outline_black_24dp.svg';
import { ReactComponent as SuccessIcon } from 'assets/Icons/check-circle-24.svg';
import { ReactComponent as WarningIcon } from 'assets/Icons/warning_black_24dp.svg';
import { ReactComponent as CloseIcon } from 'assets/Icons/close-icon.svg';

import { ReactElement } from 'react';
import { svgHoverShadow } from 'components/twin.style';

interface Props {
  title?: string;
  message?: string | ReactElement;
  type?: string;
  close?: Function;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const ToastMessage = ({
  title,
  message,
  type,
  close,
  onClick,
}: Props) => {
  const setIcon = () => {
    if (type === 'success') return <SuccessIcon />;
    else if (type === 'warning') return <WarningIcon />;
    return <ErrorIcon />;
  };

  return (
    <div
      id="toast"
      onClick={onClick}
      tw="box-shadow[ rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px] rounded"
    >
      <div
        className={`toast toast--${type}`}
        tw="flex padding[1rem 0] items-center background[#fff] rounded border-left[4px solid] box-shadow[0 5px 8px rgba(0, 0, 0, 0.08)] min-width[35rem] max-width[50rem] shadow-lg"
      >
        <div className="toast__icon" tw="padding[0 1.6rem] font-size[2.4rem]">
          {setIcon()}
        </div>
        <div className="toast__body" tw="flex-grow">
          <h3
            className="toast__title line-clamp-2"
            tw="font-size[1.6rem] font-semibold color[#333] max-width[30rem]"
            title={title}
          >
            {title}
          </h3>
          <p
            className="toast__msg"
            tw="font-size[1.4rem] color[#888] mt-1 leading-6"
          >
            {message}
          </p>
        </div>
        <div
          className="toast__close"
          tw="padding[0 16px] font-size[20px] color[rgba(0, 0, 0, 0.3)] cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            if (!close) return;
            close();
          }}
          css={removeIconCss}
        >
          <CloseIcon css={svgHoverShadow(0.2)} />
        </div>
      </div>
    </div>
  );
};

const removeIconCss = css`
  &:hover {
    svg {
      opacity: 1;
      height: 1.4rem;
      width: 1.4rem;
      ${svgHoverShadow(0.4)}
      path {
        fill: #211fcc !important;
      }
    }
  }
`;
