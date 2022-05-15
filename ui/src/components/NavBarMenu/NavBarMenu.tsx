/** @jsxImportSource @emotion/react */
import tw from "twin.macro";
import React from "react";
import { ReactComponent as MenuOpen } from "asset/icons/menu_open.svg";
import { ReactComponent as MenuClose } from "asset/icons/menu_close.svg";
import { ReactComponent as Person } from "asset/icons/person.svg";
import { ReactComponent as Cart } from "asset/icons/cart.svg";
import { ReactComponent as Search } from "asset/icons/search.svg";
import Logo from "asset/images/logo-banner.png";

import { color } from "components/twin.style";
import { useLocation } from "react-use";
import { MenuSlider } from "components/MenuSlider/MenuSlider";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlideBar } from "app/slices/toggle.slice";
import { RootState } from "app/reducer/reducer";

const styles = {
  box: tw`h-8 p-2 w-10 flex items-center cursor-pointer `,
};

export const NavBarMenu = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const location = useLocation();

  const toggle = useSelector((state: RootState) => state.toggle);

  const handleClickMenu = (isOpen: boolean) => {
    dispatch(toggleSlideBar(isOpen));
  };

  const handleClickMenuIcons = (route: string) => {
    history.push(route);
  };
  return (
    <>
      <div tw="flex justify-between items-center ml-2 mr-5 p-3 border-b-2 border-b-gray-100 fixed top-0 z-10 bg-white w-full">
        <div tw="flex h-9 w-56 leading-4 items-center">
          <button
            css={styles.box}
            onClick={() => handleClickMenu(!toggle.isOpenSlideBar)}
          >
            {toggle.isOpenSlideBar ? (
              <MenuOpen fill={color.purple_1} width={24} height={24} />
            ) : (
              <MenuClose fill={color.purple_1} width={24} height={24} />
            )}
          </button>
          <div
            onClick={() => history.push("/")}
            tw="flex items-center font-size[18px] cursor-pointer space-x-1"
          >
            <img src={Logo} alt="logo" width={32} height={32} />
            <div tw="flex">
              <span tw="text-style-purple-2 font-black">Phone</span>
              <span tw="font-black">Store</span>
            </div>
          </div>
        </div>
        <div tw="flex">
          <button css={styles.box}>
            <Person fill={color.purple_1} width={24} height={24} />
          </button>

          <button
            onClick={() => handleClickMenuIcons("/search")}
            css={styles.box}
          >
            <Search fill={color.purple_1} width={24} height={24} />
          </button>
          <button
            css={styles.box}
            onClick={() => handleClickMenuIcons("/payment")}
          >
            <Cart fill={color.purple_1} width={24} height={24} />
          </button>
        </div>
      </div>
      {!location.pathname?.includes("/payment") && <MenuSlider />}
    </>
  );
};
