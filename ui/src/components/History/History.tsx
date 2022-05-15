/** @jsxImportSource @emotion/react */
import "twin.macro";
import { isEmpty, isNil } from "lodash";
import { ProductItem } from "models/utils.model";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParam } from "react-use";
import { getHistoryPayment } from "services/payment.service";
import { PaymentItem } from "components/Payment/PaymentItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/reducer/reducer";
import Loader from "components/Loader/Loader";
import { toggleLoading } from "app/slices/toggle.slice";
import { sleepAsync } from "utils/utils";
import { ReactComponent as Nodata } from "asset/images/no-data.svg";
import { useHistory } from "react-router-dom";

export const History = () => {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState<ProductItem[]>([]);

  const phone = useSearchParam("phone");
  const toggle = useSelector((state: RootState) => state.toggle);

  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (isNil(phone)) return;
      const res = await getHistoryPayment({ sdt: phone });
      const { data } = res;

      setDetail(data?.chiTiet);
      setName(data?.chiTiet[0]?.hoTen);

      await fakeSleep(1000);

      if (isEmpty(data?.chiTiet[0]?.hoTen)) {
        await sleepAsync(3000);

        history.push("/search");

        await fakeSleep(1000);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fakeSleep = async (milisecond: number) => {
    dispatch(toggleLoading(true));

    await sleepAsync(milisecond);

    dispatch(toggleLoading(false));
  };

  return (
    <div tw="mt-16 mb-10 ml-auto mr-auto width[70%]">
      {toggle.isLoading && (
        <div className="loader__component">
          <Loader />
        </div>
      )}
      <h1 tw="text-xl text-style-purple-1 font-bold mb-5 w-1/2 mx-auto text-center">
        Lịch sử mua hàng
      </h1>

      {name && (
        <div tw="w-1/2 m-auto p-3">
          <div tw="mb-3">
            Chào anh{" "}
            <span tw="font-semibold">
              {name + " "}-{" " + phone}
            </span>
          </div>
        </div>
      )}

      {isEmpty(name) && (
        <div tw="flex flex-col items-center m-auto p-3 text-center">
          <span tw="text-2xl font-medium">
            Bạn chưa từng mua hàng ở cửa hàng chúng tôi
          </span>
          <Nodata width={480} height={480} />
        </div>
      )}

      {detail.map((item, index) => {
        return <PaymentItem isHistoryPage item={item} index={index} />;
      })}
    </div>
  );
};
