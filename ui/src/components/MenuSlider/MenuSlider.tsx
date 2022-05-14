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
import { updateFirmSelected } from "app/slices/products.slice";
import { useHistory, useLocation } from "react-router-dom";
type Props = {};

export const MenuSlider = (props: Props) => {
  const location = useLocation();
  const history = useHistory();
  const toggle = useSelector((state: RootState) => state.toggle);

  const dispatch = useDispatch();

  const handleClickListItem = (
    firm: string,
    type: string,
    isClickFirm?: boolean
  ) => {
    dispatch(updateFirmSelected({ idHang: firm, idLoai: type }));
    if (location.pathname !== "/" && !isClickFirm) {
      history.push("/");
      return;
    }
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
        // onOpen={() => handleClickListItem("apple", "phones", true)}
        // onClose={() => console.log("close")}
        open={!toggle.isOpenSlideBar ? false : undefined}
      >
        <SimpleListItem
          text="iPhone"
          onClick={() => handleClickListItem("apple", "phones")}
        />
        <SimpleListItem
          text="iPad"
          onClick={() => handleClickListItem("apple", "tablet")}
        />
        <SimpleListItem
          text="Airpod"
          onClick={() => handleClickListItem("apple", "headphone")}
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
        // onOpen={() => handleClickListItem("samsung", "phones", true)}
        open={!toggle.isOpenSlideBar ? false : undefined}
      >
        <SimpleListItem
          text="Phones"
          onClick={() => handleClickListItem("samsung", "phones")}
        />
        <SimpleListItem
          text="Tablet"
          onClick={() => handleClickListItem("samsung", "tablet")}
        />
        <SimpleListItem
          text="Galaxy Buds"
          onClick={() => handleClickListItem("samsung", "buds")}
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
        // onOpen={() => handleClickListItem("oppo", "phones", true)}
        open={!toggle.isOpenSlideBar ? false : undefined}
      >
        <SimpleListItem
          text="Phones"
          onClick={() => handleClickListItem("oppo", "phones")}
        />
        <SimpleListItem
          text="OPPO Buds"
          onClick={() => handleClickListItem("oppo", "buds")}
        />
        <SimpleListItem
          text="OPPO Watch"
          onClick={() => handleClickListItem("oppo", "watches")}
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
        // onOpen={() => handleClickListItem("xiaomi", "phones", true)}
        open={!toggle.isOpenSlideBar ? false : undefined}
      >
        <SimpleListItem
          text="Phones"
          onClick={() => handleClickListItem("xiaomi", "phones")}
        />
        <SimpleListItem
          text="Xi Watch"
          onClick={() => handleClickListItem("xiaomi", "watches")}
        />
        <SimpleListItem
          text="Xiaomi Pad"
          onClick={() => handleClickListItem("xiaomi", "pad")}
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
        // onOpen={() => handleClickListItem("vivo", "phones", true)}
        open={!toggle.isOpenSlideBar ? false : undefined}
      >
        <SimpleListItem
          text="Phones"
          onClick={() => handleClickListItem("vivo", "phones")}
        />
      </CollapsibleList>
    </List>
  );
};
