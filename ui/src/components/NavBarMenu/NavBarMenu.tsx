/** @jsxImportSource @emotion/react */
import tw from "twin.macro";
import React from "react";
import { ReactComponent as MenuOpen } from "asset/icons/menu_open.svg";
import { ReactComponent as MenuClose } from "asset/icons/menu_close.svg";
import { ReactComponent as Person } from "asset/icons/person.svg";
import { ReactComponent as Cart } from "asset/icons/cart.svg";
import { ReactComponent as Search } from "asset/icons/search.svg";

import { color } from "components/twin.style";

const styles = {
  box: tw`h-8 p-2 w-10 flex items-center cursor-pointer `,
};

export const NavBarMenu = () => {
  return (
    <div tw="flex justify-between mt-5 items-center ml-2 mr-5">
      <div tw="flex space-x-5 h-9 w-56 leading-4 items-center">
        <button css={styles.box}>
          <MenuOpen fill={color.purple_1} width={24} height={24} />
        </button>
        <div tw="flex items-center font-size[18px]">
          <span tw="text-style-purple-1 font-black">Phone</span>
          <span tw="font-black">Store</span>
        </div>
      </div>
      <div tw="flex">
        <button css={styles.box}>
          <Person fill={color.purple_1} width={24} height={24} />
        </button>
        <button css={styles.box}>
          <Search fill={color.purple_1} width={24} height={24} />
        </button>
        <button css={styles.box}>
          <Cart fill={color.purple_1} width={24} height={24} />
        </button>
      </div>
    </div>
  );
};
