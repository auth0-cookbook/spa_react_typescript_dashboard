import React from "react";
import { useHistory } from "react-router-dom";

import { View, ViewStates } from "../components/layout/view";
import { Content } from "../components/layout/content";

import { MenuItemForm } from "../components/form/menu-item-form";
import { BaseMenuItem } from "../models/menu.types";

import { useMenu } from "../utils/menu-context";

export const AddItemView = () => {
  const history = useHistory();
  const { createMenuItem } = useMenu();

  const menuItemPlaceholder: BaseMenuItem = {
    name: "French Fries",
    price: 299,
    tagline: "Crispy goodness",
    description:
      "A plate of light and crispy French fries using Idaho potatoes and peanut oil",
    image:
      "https://as2.ftcdn.net/jpg/02/13/18/09/500_F_213180964_DfqvRIHj0D3t9duYUROXuQ011AgVJIaM.jpg",
    calories: 410,
    category: "sides",
  };

  const submit = async (data: BaseMenuItem) => {
    const menuItem: BaseMenuItem = {
      ...data,
    };

    menuItem.price = menuItem.price * 100;

    await createMenuItem(menuItem);
  };

  const cancel = async (): Promise<void> => {
    history.push("/menu");
  };

  return (
    <View viewStatus={ViewStates.Valid}>
      <Content title="Add Menu Item" actionName="Cancel" action={cancel}>
        <MenuItemForm menuItem={menuItemPlaceholder} onSubmit={submit} />
      </Content>
    </View>
  );
};
