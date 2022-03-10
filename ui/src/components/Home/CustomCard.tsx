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
import "@rmwc/card/styles";
import "@rmwc/typography/styles";

import { ReactComponent as AddToCart } from "asset/icons/add_to_cart.svg";
import { ReactComponent as Favorite } from "asset/icons/favorite.svg";
import { ReactComponent as NoFavorite } from "asset/icons/no_favorite.svg";
import { color } from "components/twin.style";
import Background from "asset/images/iphone.jpg";

type Props = {
  isFavorite?: boolean;
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
              backgroundImage: `url(${Background})`,
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
          <div style={{ padding: "0 1rem 1rem 1rem" }}>
            <Typography use="body1" tag="div" theme="textSecondaryOnBackground">
              <button>hi</button>
            </Typography>
          </div>
        </CardPrimaryAction>
        <CardActions>
          <CardActionButtons>
            <CardActionButton tw="text-purple-700">1.000.000</CardActionButton>
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
