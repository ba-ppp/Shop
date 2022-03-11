/** @jsxImportSource @emotion/react */
import "twin.macro";
import React from "react";
import {
  Card,
  CardMedia,
  CardPrimaryAction,
  CardActions,
  CardActionButtons,
  CardActionButton,
  CardActionIcons,
  CardActionIcon,
} from "@rmwc/card";
import { Typography } from "@rmwc/typography";

import { ReactComponent as AddToCart } from "asset/icons/add_to_cart.svg";
import { ReactComponent as Favorite } from "asset/icons/favorite.svg";
import { ReactComponent as NoFavorite } from "asset/icons/no_favorite.svg";
import { color } from "components/twin.style";
import { Button } from "@rmwc/button";

type Props = {
  isFavorite?: boolean;
  // price: number;
};

export const CustomCard = (props: Props) => {
  const { isFavorite } = props;
  return (
    <div tw="ml-16">
      <Card style={{ width: "21rem" }}>
        <CardPrimaryAction>
          <CardMedia
            sixteenByNine
            tw=" bg-contain"
            style={{
              backgroundImage: `url('${
                process.env.PUBLIC_URL + "images/iphone.jpg"
              }')`,
            }}
          />
          <div style={{ padding: "0 1rem 1rem 1rem" }}>
            <Typography use="headline6" tag="h2">
              Iphone SE
            </Typography>
            <Typography use="body1" tag="div" theme="textSecondaryOnBackground">
              Visit ten places on our planet that are undergoing the biggest
              changes today.
            </Typography>
          </div>
        </CardPrimaryAction>
        <CardActions>
          <CardActionButtons tw='space-x-2 pl-2'>
            <Button outlined tw="text-red-700! font-bold hover:bg-red-200! border-red-400!">
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
            <Button disabled tw="text-style-purple-2!" >1.000.000</Button>
          </CardActionButtons>
          <CardActionIcons>
            <CardActionIcon icon={<AddToCart fill={color.purple_2} />} />
            <CardActionIcon icon={isFavorite ? <Favorite /> : <NoFavorite />} />
          </CardActionIcons>
        </CardActions>
      </Card>
    </div>
  );
};
