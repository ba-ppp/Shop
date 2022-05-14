/** @jsxImportSource @emotion/react */
import "twin.macro";
import { isNil } from "lodash";
import { ProductItem } from "models/utils.model";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParam } from "react-use";
import { getHistoryPayment } from "services/payment.service";
import { PaymentItem } from "components/Payment/PaymentItem";

export const History = () => {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState<ProductItem[]>([]);

  const phone = useSearchParam("phone");

  useEffect(() => {
    (async () => {
      if (isNil(phone)) return;
      const res = await getHistoryPayment({ sdt: phone });
      const { data } = res;
      setDetail(data?.chiTiet);
      setName(data?.chiTiet[0]?.hoTen);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div tw="mt-16 mb-10 ml-auto mr-auto width[70%]">
      <h1 tw="text-xl text-style-purple-1 font-bold mb-5 w-1/2 mx-auto text-center">
        Lịch sử mua hàng
      </h1>

      <div tw="w-1/2 m-auto p-3">
        <div tw="mb-3">
          Chào anh{" "}
          <span tw='font-semibold'>
            {name + " "}-{" " + phone}
          </span>
        </div>
      </div>

      {detail.map((item, index) => {
        return <PaymentItem isHistoryPage item={item} index={index} />;
      })}
    </div>
  );
};
