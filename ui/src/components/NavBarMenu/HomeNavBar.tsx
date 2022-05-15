/* eslint-disable @typescript-eslint/no-unused-vars */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import tw from "twin.macro";
// import { ReactComponent as Logo } from "asset/images/logo-banner.svg";
import Logo from "asset/images/logo-banner.png";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as StarIcon } from "asset/icons/star.svg";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ReactComponent as Admin } from "asset/icons/admin.svg";
import { ReactComponent as Logout } from "asset/icons/logout.svg";
import { useHistory } from "react-router-dom";

export const HomeNavBar = () => {
  const [activeNav, setActiveNav] = useState(1);

  const [isAdmin, toggleAdmin] = useState(false);

  const location = useLocation();
  const history = useHistory();

  const handleChangeNav = (id: number) => {
    setActiveNav(id);
  };


  useEffect(() => {
    if (location.pathname === '/') {
      setActiveNav(1);
    }
    if (location.pathname === '/search') {
      setActiveNav(2);
    }

  }, [location]);

  return (
    <>
      {!isAdmin ? (
        <div tw="bg-gray-100 h-32">
          <div tw="flex items-center justify-around">
            <NavLink to="/">
              <div tw="flex items-center space-x-2 mt-16">
                {/* <Logo width={32} height={32} /> */}
                <img src={Logo} alt="logo" width={32} height={32}/>
                <div tw="flex text-2xl">
                  <span tw="text-style-purple-2 font-black">Phone</span>
                  <span tw="font-black">Store</span>
                </div>
              </div>
            </NavLink>

            <div tw="mt-16">
              <ul tw="flex space-x-8 text-sm list-none">
              <li
                  css={[activeNav === 1 && activeNavStyle, navStyle]}
                  onClick={() => handleChangeNav(1)}
                >
                  <NavLink to="/">Trang chủ</NavLink>
                </li>
                <li
                  css={[activeNav === 4 && activeNavStyle, navStyle]}
                  onClick={() => handleChangeNav(4)}
                >
                  <NavLink to="/shop">Mua hàng</NavLink>
                </li>
                <li
                  css={[activeNav === 2 && activeNavStyle, navStyle]}
                  onClick={() => handleChangeNav(2)}
                >
                  <NavLink to="/search">Lịch sử mua hàng</NavLink>
                </li>
                <li
                  css={[activeNav === 3 && activeNavStyle, navStyle]}
                  onClick={() => handleChangeNav(3)}
                >
                  <NavLink to="/payment">Giỏ hàng</NavLink>
                </li>
                {/* <NavLink to="/admin">
                  <li
                    onClick={() => history.push("/admin")}
                    tw="flex -mt-2 tracking-wider text-white bg-style-purple-2 hover:bg-style-purple-3 px-4 py-1 text-sm rounded leading-loose mx-2 font-semibold cursor-pointer"
                  >
                    <StarIcon fill="white" tw="mr-0.5" />
                    Quản lý
                  </li>
                </NavLink> */}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div tw="flex justify-between p-10 fixed width[96%] h-4 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500">
          <div tw="flex items-center space-x-2 cursor-pointer">
            <Admin fill="white" />
            <div tw="text-white">Admin</div>
          </div>
          <div
            onClick={() => history.push("/")}
            tw="flex items-center space-x-2 cursor-pointer"
          >
            <Logout fill="white" />
            <div tw="text-white">Log out</div>
          </div>
        </div>
      )}
    </>
  );
};

const navStyle = css`
  ${tw`
  cursor-pointer font-size[16px]
  font-medium
  hover:(text-style-purple-2)
  visited:(text-decoration[none])!
`}
`;

const activeNavStyle = css`
  ${tw`
  border-bottom[2px solid] border-style-purple-3
`}
`;
