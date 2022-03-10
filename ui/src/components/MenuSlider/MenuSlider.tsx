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
import { ReactComponent as AppleLogo } from "asset/images/apple_logo.svg";
import { ReactComponent as SamsungLogo } from "asset/images/samsung.svg";
import { ReactComponent as OppoLogo } from "asset/images/oppo.svg";
import { ReactComponent as XiaomiLogo } from "asset/images/xiaomi.svg";
import { ReactComponent as VivoLogo } from "asset/images/vivo.svg";
type Props = {
  isOpen?: boolean;
  handleClickMenu: (isOpen?: boolean) => void;
};

export const MenuSlider = (props: Props) => {
  const { isOpen, handleClickMenu } = props;
  
  return (
    <List
      tw="w-52 fixed"
      css={[!isOpen && tw`duration-500 w-12`, isOpen && tw`duration-500`]}
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
      >
        <SimpleListItem text="Phones" />
      </CollapsibleList>
    </List>
  );
};
