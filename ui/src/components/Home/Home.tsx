/** @jsxImportSource @emotion/react */
import "@rmwc/card/styles";
import "@rmwc/typography/styles";
import { RootState } from 'app/reducer/reducer';

import { Product } from "models/utils.model";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "twin.macro";
import tw from 'twin.macro';
import { CustomCard } from "./CustomCard";
import { ProductMock } from "./product.mock";

export const Home = () => {
  const [dataRender, setDataRender] = useState<Product[][]>([]);

  const toggle = useSelector((state: RootState) => state.toggle);

  const handleDataRender = (product: Product[]) => {
    const newData: Product[][] = [];
    let tempData: Product[] = [];
    product.forEach((item: Product, index) => {
      if (index % 4 === 0) {
        newData.push(tempData);
        tempData = [];
      }
      tempData.push(item);
    });
    if (tempData.length > 0) {
      newData.push(tempData);
    }
    return newData;
  };
  useEffect(() => {
    const newData = handleDataRender(ProductMock);
    setDataRender(newData);
  }, []);
  return (
    <>
      <div tw="mt-16 mb-10">
        {dataRender.map((product) => {
          return (
            <div tw=" mt-6 flex" css={[!toggle.isOpenSlideBar ? tw`ml-32 duration-500`: tw`ml-64 duration-500`]}>
              {product.map((item) => {
                return <CustomCard item={item} />;
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};
