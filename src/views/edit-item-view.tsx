import React from "react";
import { useHistory, useParams } from "react-router-dom";

import { View, ViewStates } from "../components/layout/view";
import { Content } from "../components/layout/content";
import { MenuItemForm } from "../components/form/menu-item-form";

import { Loader } from "../components/ui/loader";
import { useAccessRoles } from "../components/security/use-access-roles";
import { useMenu } from "../utils/menu-context";
import { useMenuItem } from "../utils/use-menu-item";

import { BaseMenuItem, FetchState, MenuItem } from "../models/menu.types";
import { Button } from "../components/ui/button";
import { USER_ROLES } from "../components/security/user-roles";

export const EditItemView = () => {
  const history = useHistory();
  const { menuItemId } = useParams();

  const { accessRoles } = useAccessRoles();
  const { updateMenuItem } = useMenu();

  const { menuItem, fetchState } = useMenuItem(menuItemId);

  const cancel = async () => {
    await history.push(`/menu/${menuItemId}`);
  };

  const submit = async (data: BaseMenuItem) => {
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

  if (!(menuItem && accessRoles[USER_ROLES.MENU_ADMIN])) {
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
