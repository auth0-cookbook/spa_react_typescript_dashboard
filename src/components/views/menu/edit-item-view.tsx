import React from "react";
import { useHistory, useParams } from "react-router-dom";

import { View, ViewStates } from "../../layout/view";
import { Content } from "../../layout/content";
import { MenuItemForm } from "../../form/menu-item-form";

import { Loader } from "../../ui/loader";
import { useMenuAdmin } from "../../../hooks/use-menu-admin";
import { useMenu } from "../../../context/menu-context";
import { useMenuItem } from "../../../hooks/use-menu-item";

import {
  FetchState,
  MenuFormInput,
  MenuItem,
} from "../../../models/menu.types";
import { Button } from "../../ui/button";

export const EditItemView = () => {
  const history = useHistory();
  const { menuItemId } = useParams();

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
    return <Loader />;
  }

  if (!(menuItem && isMenuAdmin)) {
    return (
      <View viewStatus={ViewStates.NotFound}>
        <Button
          variant="outline"
          label="View menu items"
          action={() => history.push("/menu")}
        />
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
