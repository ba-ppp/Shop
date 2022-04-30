/** @jsxImportSource @emotion/react */
import React from "react";
import tw from "twin.macro";
import { CollapsibleList, SimpleListItem } from "@rmwc/list";
import { ReactComponent as Add } from "asset/icons/add.svg";
import { get, keys } from "lodash";

type Data = {
  [key: string]: string;
};

type Props = {
  header: string;
  data: Data;
};
const style = {
  listHead: tw`w-full flex px-5 py-5 border-b border-solid justify-between`,
  listItem: tw`w-1/2 text-sm`,
};
export const ListDetail = (props: Props) => {
  const { header, data } = props;
  return (
    <CollapsibleList
      handle={
        <SimpleListItem
          text={<div tw="font-bold">{header}</div>}
          metaIcon={<Add height={16} width={16} />}
        />
      }
      tw="bg-gray-100 text-sm"
    >
      <div>
        {keys(data).map((key) => {
          return (
            <div css={style.listHead}>
              <div>{key}:</div>
              <div css={style.listItem}>{get(data, key)}</div>
            </div>
          );
        })}
  
      </div>
    </CollapsibleList>
  );
};
