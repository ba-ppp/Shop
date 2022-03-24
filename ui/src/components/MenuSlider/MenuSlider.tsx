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
import { RootState } from "app/reducer/Reducer";
import { toggleSlideBar } from 'app/slices/toggle.slice';
type Props = {};

export const MenuSlider = (props: Props) => {
  const toggle = useSelector((state: RootState) => state.toggle);

  const dispatch = useDispatch();

  const handleClickMenu = (isOpen: boolean) => {
    dispatch(toggleSlideBar(isOpen));
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
        onOpen={() => handleClickMenu(true)}
        // onClose={() => console.log("close")}
        open={!toggle.isOpenSlideBar ? false : undefined}
      >
        <SimpleListItem text="Phones" />
        <SimpleListItem text="Watchs" />
        <SimpleListItem text="Airpad" />
        <SimpleListItem text="Airpod" />
      </CollapsibleList>

      <CollapsibleList
        handle={
          <ListItem>
            <ListItemGraphic tw="" icon={<SamsungLogo />} />
            <ListItemText>Samsung</ListItemText>
            <ListItemMeta icon={<ArrowDown />} />
          </ListItem>
        }
        open={!toggle.isOpenSlideBar ? false : undefined}
      >
        <SimpleListItem text="Phones" />
        <SimpleListItem text="Tablet" />
        <SimpleListItem text="Galaxy Buds" />
      </CollapsibleList>

      <CollapsibleList
        handle={
          <SimpleListItem
            text="OPPO"
            graphic={<OppoLogo />}
            metaIcon={<ArrowDown />}
          />
        }
        open={!toggle.isOpenSlideBar ? false : undefined}
      >
        <SimpleListItem text="Phones" />
        <SimpleListItem text="OPPO Buds" />
        <SimpleListItem text="OPPO Watch" />
      </CollapsibleList>
      <CollapsibleList
        handle={
          <SimpleListItem
            text="XIAOMI"
            graphic={<XiaomiLogo />}
            metaIcon={<ArrowDown />}
          />
        }
        open={!toggle.isOpenSlideBar ? false : undefined}
      >
        <SimpleListItem text="Phones" />
        <SimpleListItem text="Xi Watch" />
        <SimpleListItem text="Xiaomi Pad" />
      </CollapsibleList>
      <CollapsibleList
        handle={
          <SimpleListItem
            text="VIVO"
            graphic={<VivoLogo />}
            metaIcon={<ArrowDown />}
          />
        }
        open={!toggle.isOpenSlideBar ? false : undefined}
      >
        <SimpleListItem text="Phones" />
      </CollapsibleList>
    </List>
  );
};
