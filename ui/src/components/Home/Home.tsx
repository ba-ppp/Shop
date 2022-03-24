/** @jsxImportSource @emotion/react */
import "@rmwc/card/styles";
import "@rmwc/typography/styles";
import { Product } from "models/utils.model";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "twin.macro";
import { CustomCard } from "./CustomCard";
import { ProductMock } from "./product.mock";

export const Home = () => {
  const [dataRender, setDataRender] = useState<Product[][]>([]);
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
            <div tw="ml-64 mt-6 flex">
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
