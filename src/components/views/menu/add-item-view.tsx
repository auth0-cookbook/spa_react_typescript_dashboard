import React, { useState } from "react";

import { View, ViewStates } from "../../layout/view";
import { Content } from "../../layout/content";

import { MenuFormInput, MenuItem } from "../../../models/menu.types";

import { MenuItemForm } from "../../form/menu-item-form";
import { useHistory } from "react-router-dom";

import { useMenu } from "../../../context/menu-context";
import { Loading } from "../../ui/loading";

export const AddItemView = () => {
  const [isProcessing] = useState<boolean>(false);
  const history = useHistory();
  const { createMenuItem } = useMenu();

  const submit = async (data: MenuFormInput) => {
    const menuItem: MenuItem = {
      id: -1,
      ...data,
    };

    menuItem.price = menuItem.price * 100;

    console.log(menuItem);

    await createMenuItem(menuItem);
  };

  const menuItemPlaceholder: MenuItem = {
    id: -1,
    name: "Spring Salad",
    price: 400,
    description: "Fresh",
    image: "https://cdn.auth0.com/blog/whatabyte/salad-sm.png",
  };

  const cancel = async (): Promise<void> => {
    history.push("/menu");
  };

  if (isProcessing) {
    return (
      <View viewStatus={ViewStates.Valid}>
        <Loading />
      </View>
    );
  }

  return (
    <View viewStatus={ViewStates.Valid}>
      <Content title="Edit Menu Item" actionName="Cancel" action={cancel}>
        <MenuItemForm menuItem={menuItemPlaceholder} onSubmit={submit} />
      </Content>
    </View>
  );
};
