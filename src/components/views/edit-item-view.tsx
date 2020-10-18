import React from "react";

import View, { ViewStates } from "../layout/view";
import Content from "../layout/content";
import Button from "../button";
import MenuItemForm from "../form/menu-item-form";

import { MenuFormInput, MenuItem } from "../../models/menu.types";

import { useHistory, useParams } from "react-router-dom";
import { useStoreActions, useStoreState } from "../../store/store";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../loading";

const EditItemView = () => {
  const history = useHistory();
  const { menuItemId } = useParams();

  const { items } = useStoreState((state) => state.menu);
  const { isMenuLoading } = useStoreState((state) => state.menuUi);
  const { isMenuAdmin } = useStoreState((state) => state.user);
  const { updateItem } = useStoreActions((actions) => actions.menu);

  const { getAccessTokenSilently } = useAuth0();

  const itemId = parseInt(menuItemId, 10);
  const menuItem: MenuItem = items[itemId];

  if (!menuItem && !isMenuAdmin) {
    return (
      <View viewStatus={ViewStates.NotFound}>
        <Button label="View menu items" action={() => history.push("/menu")} />
      </View>
    );
  }

  const cancel = async () => {
    await history.push(`/menu/${menuItemId}`);
  };

  const submit = async (data: MenuFormInput) => {
    const token = await getAccessTokenSilently();

    const menuItem: MenuItem = {
      id: itemId,
      ...data,
    };

    menuItem.price = menuItem.price * 100;

    updateItem({
      id: itemId,
      data: menuItem,
      token,
    });
  };

  if (isMenuLoading) {
    return <Loading />;
  }

  return (
    <View viewStatus={ViewStates.Valid}>
      <Content title="Edit Menu Item" actionName="Cancel" action={cancel}>
        <MenuItemForm menuItem={menuItem} onSubmit={submit} />
      </Content>
    </View>
  );
};

export default EditItemView;
