import React from "react";

import "./menu-item-view.scss";
import View, { ViewStates } from "../layout/view";

import Button from "../button";

import Content from "../layout/content";
import { useParams, useHistory } from "react-router-dom";
import { useStoreActions, useStoreState } from "../../store/store";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../loading";

const MenuItemView: React.FC = () => {
  const { menuItemId } = useParams();
  const history = useHistory();

  const { items } = useStoreState((state) => state.menu);
  const { isMenuLoading } = useStoreState((state) => state.menuUi);
  const { isMenuAdmin } = useStoreState((state) => state.user);
  const { deleteItem } = useStoreActions((actions) => actions.menu);

  const { getAccessTokenSilently } = useAuth0();

  const itemId = parseInt(menuItemId, 10);
  const menuItem = items[itemId];

  const back = async () => {
    history.push("/menu");
  };

  if (!menuItem) {
    return (
      <View viewStatus={ViewStates.NotFound}>
        <Button label="View menu items" action={() => history.push("/menu")} />
      </View>
    );
  }

  if (isMenuLoading) {
    return <Loading />;
  }

  return (
    <View viewStatus={ViewStates.Valid}>
      <Content title={menuItem.name} actionName="Back" action={back}>
        <div className="MenuItem">
          <img
            className="MenuItem__image"
            src={menuItem.image}
            alt={`${menuItem.name}`}
          />
          <span className="MenuItem__price">
            ${(menuItem.price / 100).toFixed(2)}
          </span>
          <div className="MenuItem__details">
            <span className="MenuItem__description">
              {menuItem.description}
            </span>
          </div>
          {isMenuAdmin && menuItem && (
            <div className="MenuItem__actions">
              <Button
                label="Edit"
                size="xsmall"
                action={() => {
                  menuItem && history.push(`/menu/${menuItem.id}/edit-item/`);
                }}
              />
              <Button
                label="Delete"
                size="xsmall"
                action={async () => {
                  const token = await getAccessTokenSilently();

                  deleteItem({ id: menuItem.id, token });
                }}
              />
            </div>
          )}
        </div>
      </Content>
    </View>
  );
};

export default MenuItemView;
