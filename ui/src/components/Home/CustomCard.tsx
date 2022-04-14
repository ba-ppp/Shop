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
import { Product, ProductItem } from 'models/utils.model';
import { useHistory } from 'react-router-dom';
import { numberToVND } from 'utils/utils';

type Props = {
  item: ProductItem;
};

export const CustomCard = (props: Props) => {
  const { item } = props;

  const history = useHistory();

  const handleClickItem = () => {
    history.push(`/detail/${item.id}`);
  }
  return (
    <div tw="ml-16 mt-5">
      <Card style={{ width: "21rem" }}>
        <CardPrimaryAction onClick={handleClickItem}>
          <CardMedia
            sixteenByNine
            tw=" bg-contain"
            style={{
              backgroundImage: `url('${
                process.env.PUBLIC_URL + "/images/" + item.anh
              }')`,
            }}
          />
          <div style={{ padding: "0 1rem 1rem 1rem" }}>
            <Typography use="headline6" tag="h2">
              {item.ten}
            </Typography>
            <Typography use="body1" tag="div" theme="textSecondaryOnBackground">
              Visit ten places on our planet that are undergoing the biggest
              changes today.
            </Typography>
          </div>
        </CardPrimaryAction>
        <CardActions>
          <CardActionButtons tw='space-x-2 pl-2'>
            <Button outlined tw="text-red-700! font-bold hover:bg-red-200! border-red-400! active:bg-red-400! focus:bg-red-200!">
              Red
            </Button>
            <Button outlined tw="text-style-purple-2! hover:bg-style-purple-1! font-bold border-style-purple-2!">
              Purple
            </Button>
            <Button outlined tw="text-blue-500! hover:bg-blue-300 font-bold border-blue-400!">
              Blue
            </Button>
          </CardActionButtons>
        </CardActions>
        <CardActions>
          <CardActionButtons>
            <Button disabled tw="text-style-purple-2!" >{numberToVND(item.gia)}</Button>
          </CardActionButtons>
          <CardActionIcons>
            <CardActionIcon icon={<AddToCart fill={color.purple_2} />} />
            <CardActionIcon icon={false ? <Favorite /> : <NoFavorite />} />
          </CardActionIcons>
        </CardActions>
      </Card>
    </div>
  );
};
