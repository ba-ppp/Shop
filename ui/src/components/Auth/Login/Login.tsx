/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource @emotion/react */
import "twin.macro";
import React from "react";
import Background from "asset/images/background.jpg";
import { useState } from "react";
import { useToggle } from "react-use";
import { useHistory } from "react-router-dom";
import { BaseAPI } from "api/api";
import { StatusCode } from "models/enums";
import { customToast } from "components/Utils/toast.util";
import { isAdmin, setToken } from "utils/utils";
import { useDispatch } from "react-redux";
import { toggleAdmin } from "app/slices/User/Admin.slice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, toggleRemember] = useToggle(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleRedirect = (field: string) => {
    history.push(`/${field}`);
  };

  const handleSignIn = async () => {
    const params = {
      email,
      password,
      isRemember,
    };
    const response = await BaseAPI.post("/auth/signin", params);
    if (response.status === StatusCode.OK) {
      const token = response.data.token;

      setToken(token);

      dispatch(toggleAdmin(isAdmin(token))); // set admin

      history.push("/");
      return;
    }
    if (response.status === StatusCode.UNAUTHORIZED) {
      customToast.error("Invalid email or password");
      return;
    }
    customToast.error("Something went wrong");
  };
  return (
    <div
      tw="min-h-screen sm:flex sm:flex-row mx-0 justify-center bg-cover bg-center z-0"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div tw="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
        <div tw="self-start hidden lg:flex flex-col">
          <h1 tw="mb-3 font-bold text-5xl text-white">Hi, Welcome Back</h1>
          <p tw="pr-3 font-bold text-white">
            What would you like to do today? Let get in and start shopping.{" "}
            <br />
          </p>
        </div>
      </div>
      <div tw="flex justify-center self-center  z-10">
        <div tw="p-12 bg-white mx-auto rounded-2xl w-96">
          <div tw="mb-4">
            <h3 tw="font-semibold text-2xl text-gray-800">Sign In </h3>
            <p tw="text-gray-500">Please sign in to your account.</p>
          </div>
          <div tw="space-y-5">
            <div tw="space-y-2">
              <label tw="text-sm font-medium text-gray-700 tracking-wide">
                Email
              </label>
              <input
                tw=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-style-purple-1"
                type="text"
                placeholder="mail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div tw="space-y-2">
              <label tw="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                Password
              </label>
              <input
                tw="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-style-purple-1"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div tw="flex items-center justify-between">
              <div tw="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  tw="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded cursor-pointer accent-color[#5551FF]"
                  onChange={(e) => toggleRemember(e.target.checked)}
                  checked={isRemember}
                />
                <label
                  htmlFor="remember_me"
                  tw="ml-2 block text-sm text-gray-800"
                >
                  Remember me
                </label>
              </div>
              <div tw="text-sm">
                <a tw="text-style-purple-1 hover:text-style-purple-2 cursor-pointer">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                tw="w-full flex justify-center bg-style-purple-1  hover:bg-style-purple-2 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                onClick={handleSignIn}
              >
                Sign in
              </button>
            </div>
          </div>
          <div tw="pt-5 text-center text-gray-400 font-size[14px]">
            <div>
              Don't have any account?
              <a
                rel="noreferrer"
                tw="ml-1 text-style-purple-1 hover:text-style-purple-2 font-bold cursor-pointer"
                onClick={() => handleRedirect("signup")}
              >
                Create an account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
