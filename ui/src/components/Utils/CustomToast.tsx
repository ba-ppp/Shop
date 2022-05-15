/** @jsxImportSource @emotion/react */
import "twin.macro";

import { CheckmarkIcon, ErrorIcon, LoaderIcon } from "react-hot-toast";
import { ToastType } from "react-hot-toast/dist/core/types";
import { ReactElement } from "react";

interface Props {
  type?: ToastType | "no-icon";
  title?: string | ReactElement;
  message?: string | ReactElement;
}

export const CustomToast = ({ type, title, message, ...props }: Props) => {
  return (
    <div tw="flex items-center text-black">
      {type && (
        <div tw="mr-6">
          {type === "success" && <CheckmarkIcon />}
          {type === "error" && <ErrorIcon />}
          {type === "loading" && <LoaderIcon />}
        </div>
      )}
      <div>
        <div tw="font-medium font-size[15px]">{title || "Title"}</div>
        {message && <div tw="font-size[14px] mt-1">{message || "Message"}</div>}
      </div>
    </div>
  );
};
