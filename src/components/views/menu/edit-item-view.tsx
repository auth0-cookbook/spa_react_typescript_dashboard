import React from "react";

import { View, ViewStates } from "../../layout/view";
import { Content } from "../../layout/content";
import { Button } from "../../button";
import { MenuItemForm } from "../../form/menu-item-form";

import {
  FetchState,
  MenuFormInput,
  MenuItem,
} from "../../../models/menu.types";

import { useHistory, useParams } from "react-router-dom";

import { Loading } from "../../loading";
import { useMenuAdmin } from "../../../hooks/use-menu-admin";
import { useMenu } from "../../../context/menu-context";
import { useMenuItem } from "../../../hooks/use-menu-item";

export const EditItemView = () => {
  const history = useHistory();
  const { menuItemId: menuItemIdParam } = useParams();
  const menuItemId = parseInt(menuItemIdParam, 10);

  const isMenuAdmin = useMenuAdmin();
  const { updateMenuItem } = useMenu();

  const { menuItem, fetchState } = useMenuItem(menuItemId);

  const cancel = async () => {
    await history.push(`/menu/${menuItemId}`);
  };

  const submit = async (data: MenuFormInput) => {
    const menuItem: MenuItem = {
      id: menuItemId,
      ...data,
    };

    menuItem.price = menuItem.price * 100;

    await updateMenuItem(menuItem);
  };

  if (fetchState === FetchState.FETCHING) {
    return <Loading />;
  }

  if (!(menuItem && !isMenuAdmin)) {
    return (
      <View viewStatus={ViewStates.NotFound}>
        <Button label="View menu items" action={() => history.push("/menu")} />
      </View>
    );
  }

  return (
    <View viewStatus={ViewStates.Valid}>
      <Content title="Edit Menu Item" actionName="Cancel" action={cancel}>
        <MenuItemForm menuItem={menuItem} onSubmit={submit} />
      </Content>
    </View>
  );
};
