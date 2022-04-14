/* eslint-disable jsx-a11y/alt-text */
/** @jsxImportSource @emotion/react */
import tw from "twin.macro";
import React from "react";
import {
  CollapsibleList,
  List,
  SimpleListItem,
  ListItemGraphic,
  ListItem,
  ListItemText,
  ListItemMeta,
} from "@rmwc/list";
import "@rmwc/list/styles";
import { ReactComponent as ArrowDown } from "asset/icons/arrow_down.svg";
import { ReactComponent as AppleLogo } from "asset/icons/apple_logo.svg";
import { ReactComponent as SamsungLogo } from "asset/icons/samsung.svg";
import { ReactComponent as OppoLogo } from "asset/icons/oppo.svg";
import { ReactComponent as XiaomiLogo } from "asset/icons/xiaomi.svg";
import { ReactComponent as VivoLogo } from "asset/icons/vivo.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/reducer/reducer";
import { toggleSlideBar } from "app/slices/toggle.slice";
import {
  setIdHangSelected,
  setIdLoaiSelected,
} from "app/slices/products.slice";
type Props = {};

export const MenuSlider = (props: Props) => {
  const toggle = useSelector((state: RootState) => state.toggle);

  const dispatch = useDispatch();

  const handleClickList = (firm: string) => {
    dispatch(setIdHangSelected(firm));
  };

  const handleClickListItem = (type: string) => {
    dispatch(setIdLoaiSelected(type));
  };

  return (
    <List
      tw="w-64 fixed p-3 border-r-2 border-r-gray-100 h-full mt-0"
      css={[
        !toggle.isOpenSlideBar && tw`duration-500 w-20`,
        toggle.isOpenSlideBar && tw`duration-500`,
      ]}
    >
      <CollapsibleList
        handle={
          <ListItem>
            <ListItemGraphic icon={<AppleLogo />} />
            <ListItemText>Apple</ListItemText>
            <ListItemMeta icon={<ArrowDown />} />
          </ListItem>
        }
        onOpen={() => handleClickList("apple")}
        // onClose={() => console.log("close")}
        open={!toggle.isOpenSlideBar ? false : undefined}
      >
        <SimpleListItem
          text="Phones"
          onClick={() => handleClickListItem("phones")}
        />
        <SimpleListItem
          text="Airpad"
          onClick={() => handleClickListItem("airpad")}
        />
        <SimpleListItem
          text="Airpod"
          onClick={() => handleClickListItem("airpod")}
        />
      </CollapsibleList>

      <CollapsibleList
        handle={
          <ListItem>
            <ListItemGraphic tw="" icon={<SamsungLogo />} />
            <ListItemText>Samsung</ListItemText>
            <ListItemMeta icon={<ArrowDown />} />
          </ListItem>
        }
        onOpen={() => handleClickList("samsung")}
        open={!toggle.isOpenSlideBar ? false : undefined}
      >
        <SimpleListItem
          text="Phones"
          onClick={() => handleClickListItem("phones")}
        />
        <SimpleListItem
          text="Tablet"
          onClick={() => handleClickListItem("tablet")}
        />
        <SimpleListItem
          text="Galaxy Buds"
          onClick={() => handleClickListItem("buds")}
        />
      </CollapsibleList>

      <CollapsibleList
        handle={
          <SimpleListItem
            text="OPPO"
            graphic={<OppoLogo />}
            metaIcon={<ArrowDown />}
          />
        }
        onOpen={() => handleClickList("oppo")}
        open={!toggle.isOpenSlideBar ? false : undefined}
      >
        <SimpleListItem
          text="Phones"
          onClick={() => handleClickListItem("phones")}
        />
        <SimpleListItem
          text="OPPO Buds"
          onClick={() => handleClickListItem("buds")}
        />
        <SimpleListItem
          text="OPPO Watch"
          onClick={() => handleClickListItem("watches")}
        />
      </CollapsibleList>
      <CollapsibleList
        handle={
          <SimpleListItem
            text="XIAOMI"
            graphic={<XiaomiLogo />}
            metaIcon={<ArrowDown />}
          />
        }
        onOpen={() => handleClickList("xiaomi")}
        open={!toggle.isOpenSlideBar ? false : undefined}
      >
        <SimpleListItem
          text="Phones"
          onClick={() => handleClickListItem("phones")}
        />
        <SimpleListItem
          text="Xi Watch"
          onClick={() => handleClickListItem("watches")}
        />
        <SimpleListItem
          text="Xiaomi Pad"
          onClick={() => handleClickListItem("pad")}
        />
      </CollapsibleList>
      <CollapsibleList
        handle={
          <SimpleListItem
            text="VIVO"
            graphic={<VivoLogo />}
            metaIcon={<ArrowDown />}
          />
        }
        onOpen={() => handleClickList("vivo")}
        open={!toggle.isOpenSlideBar ? false : undefined}
      >
        <SimpleListItem
          text="Phones"
          onClick={() => handleClickListItem("phones")}
        />
      </CollapsibleList>
    </List>
  );
};
