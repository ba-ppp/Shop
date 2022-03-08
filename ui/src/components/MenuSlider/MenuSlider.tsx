import React from "react";
import { CollapsibleList, List, SimpleListItem } from "@rmwc/list";
import '@rmwc/list/styles';
import { ReactComponent as Search } from "asset/icons/search.svg";


export const MenuSlider = () => {
  return (
    <List>
      <CollapsibleList
        handle={
          <SimpleListItem
            text="Cookies"
            graphic="favorite"
            metaIcon={<Search />}
          />
        }
        onOpen={() => console.log("open")}
        onClose={() => console.log("close")}
      >
        <SimpleListItem text="Chocolate Chip" />
        <SimpleListItem text="Ginger Snap" />
        <SimpleListItem text="Peanut Butter" />
      </CollapsibleList>

      <CollapsibleList
        handle={
          <SimpleListItem
            text="Pizza"
            graphic="local_pizza"
            metaIcon="chevron_right"
          />
        }
      >
        <SimpleListItem text="Cheese" />
        <SimpleListItem text="Pepperoni" />
        <SimpleListItem text="Supreme" />
      </CollapsibleList>

      <CollapsibleList
        handle={
          <SimpleListItem
            text="Icecream"
            graphic="star"
            metaIcon="chevron_right"
          />
        }
      >
        <SimpleListItem text="Vanilla" />
        <SimpleListItem text="Chocolate" />
        <CollapsibleList
          handle={
            <SimpleListItem
              text="Nested Collapsible"
              graphic="touch_app"
              metaIcon="chevron_right"
            />
          }
        >
          <SimpleListItem text="Orange" />
          <SimpleListItem text="Strawberry" />
          <SimpleListItem text="Blueberry" />
        </CollapsibleList>
      </CollapsibleList>
    </List>
  );
};
