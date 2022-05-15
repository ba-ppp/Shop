/** @jsxImportSource @emotion/react */
import "twin.macro";
import React from "react";
import {
  Card,
  CardMedia,
  CardPrimaryAction,
  CardActions,
  CardActionButtons,
  CardActionIcons,
  CardActionIcon,
} from "@rmwc/card";
import { Typography } from "@rmwc/typography";

import { ReactComponent as AddToCart } from "asset/icons/add_to_cart.svg";
import { ReactComponent as Favorite } from "asset/icons/favorite.svg";
import { ReactComponent as NoFavorite } from "asset/icons/no_favorite.svg";
import { color } from "components/twin.style";
import { Button } from "@rmwc/button";
import { ProductItem } from "models/utils.model";
import { useHistory } from "react-router-dom";
import { numberToVND } from "utils/utils";
import { useState } from "react";
import { CustomButton } from "components/Shared/CustomButton";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCartItem } from "app/slices/carts.slice";
import { customToast } from "components/Utils/toast.util";

type Props = {
  item: ProductItem;
};

export const CustomCard = (props: Props) => {
  const { item } = props;

  const [selectedImage, setSeletedImage] = useState(item.anh[0]);
  const history = useHistory();

  const dispatch = useDispatch();

  const handleClickItem = () => {
    history.push(`/detail/${item.id}`);
  };

  const handleClickColorButton = (index: number) => {
    setSeletedImage(item.anh[index]);
  };

  const handleAddToCart = () => {
    customToast.success("", "Thêm vào giỏ hàng thành công");
    dispatch(addCartItem(item));
  };

  useEffect(() => {
    setSeletedImage(item.anh[0]);
  }, [item]);
  return (
    <div tw="ml-16 mt-5">
      <Card style={{ width: "21rem" }}>
        <CardPrimaryAction onClick={handleClickItem}>
          <CardMedia
            sixteenByNine
            tw=" bg-contain"
            style={{
              backgroundImage: `url('${
                process.env.PUBLIC_URL + "/images/" + selectedImage
              }')`,
            }}
          />
          <div style={{ padding: "0 1rem 1rem 1rem" }}>
            <Typography use="headline6" tag="h2">
              {item.ten}
            </Typography>
            <Typography use="body1" tag="div" theme="textSecondaryOnBackground">
              <span tw="line-clamp-2">
                {item.moTa}
              </span>
            </Typography>
          </div>
        </CardPrimaryAction>
        <CardActions tw="grid grid-cols-3 grid-rows-2 gap-3">
          {/* <CardActionButtons tw="space-x-2 pl-2"> */}
          {item?.mau.map((i, index) => {
            return (
              <CustomButton
                handleClickColorButton={handleClickColorButton}
                text={i}
                index={index}
              />
            );
          })}
          {/* </CardActionButtons> */}
        </CardActions>
        <CardActions>
          <CardActionButtons>
            <Button disabled tw="text-style-purple-2!">
              {numberToVND(item.gia[0])}
            </Button>
          </CardActionButtons>
          <CardActionIcons>
            <CardActionIcon
              onClick={handleAddToCart}
              icon={<AddToCart fill={color.purple_2} />}
            />
            <CardActionIcon icon={false ? <Favorite /> : <NoFavorite />} />
          </CardActionIcons>
        </CardActions>
      </Card>
    </div>
  );
};
