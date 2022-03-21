/** @jsxImportSource @emotion/react */
import React from "react";
import tw from "twin.macro";
import { CollapsibleList, SimpleListItem } from "@rmwc/list";
import { ReactComponent as Add } from "asset/icons/add.svg";

const style = {
  listHead: tw`w-full flex px-5 py-5 border-b border-solid justify-between`,
  listItem: tw`w-1/2 text-sm`
};
export const ListDetail = () => {
  return (
    <CollapsibleList
      handle={
        <SimpleListItem
          text={<div tw='font-bold'>Màn hình</div>}
          metaIcon={<Add height={16} width={16} />}
        />
      }
      tw="bg-gray-100 text-sm"
      onOpen={() => console.log("open")}
      onClose={() => console.log("close")}
    >
      <div>
        <div css={style.listHead}>
          <div>Công nghệ màn hình:</div>
          <div css={style.listItem}>IPS LCD</div>
        </div>
        <div css={style.listHead}>
          <div>Độ phân giải:</div>
          <div css={style.listItem}>HD (750 x 1334 Pixels)</div>
        </div>
        <div css={style.listHead}>
          <div>Màn hình rộng:</div>
          <div css={style.listItem}>4.7" - Tần số quét Hãng không công bố</div>
        </div>
        <div css={style.listHead}>
          <div>Độ sáng tối đa:</div>
          <div css={style.listItem}>625 nits</div>
        </div>
        <div css={style.listHead}>
          <div>Mặt kính cảm ứng:</div>
          <div css={style.listItem}>Đang cập nhật</div>
        </div>
      </div>
    </CollapsibleList>
  );
};
