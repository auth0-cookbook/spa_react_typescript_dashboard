import React from "react";

import { View, ViewStates } from "../../layout/view";
import { Button } from "../../button";
import { Content } from "../../layout/content";

import { useHistory, useParams } from "react-router-dom";
import { useMenu } from "../../../context/menu-context";
import { useMenuAdmin } from "../../../hooks/use-menu-admin";
import { useMenuItem } from "../../../hooks/use-menu-item";

import { FetchState } from "../../../models/menu.types";

import "./menu-item-view.scss";

export const MenuItemView: React.FC = () => {
  const history = useHistory();
  const { menuItemId } = useParams();
  const itemId = parseInt(menuItemId, 10);

  const { deleteMenuItem } = useMenu();
  const isMenuAdmin = useMenuAdmin();
  const { menuItem, menuItemFetchError, fetchState } = useMenuItem(itemId);

  const back = async () => {
    history.push("/menu");
  };

  if (fetchState === FetchState.FETCHING) {
    return (
      <View viewStatus={ViewStates.Valid}>
        <Content title={""} actionName="Back" action={back}>
          <div className="menu-item">
            <div className="menu-item__placeholder" />
            <span className="menu-item__mock-price">$0.00</span>
            <div className="menu-item__details">
              <span className="menu-item__mock-data">Loading</span>
            </div>
          </div>
        </Content>
      </View>
    );
  }

  if (fetchState === FetchState.FETCH_NOT_FOUND) {
    return (
      <View viewStatus={ViewStates.NotFound}>
        <Button label="View menu items" action={() => history.push("/menu")} />
      </View>
    );
  }

  if (fetchState === FetchState.FETCH_ERROR) {
    return (
      <View viewStatus={ViewStates.NotFound}>
        {menuItemFetchError && <span>{menuItemFetchError.message}</span>}
      </View>
    );
  }

  if (fetchState === FetchState.FETCHED && menuItem) {
    return (
      <View viewStatus={ViewStates.Valid}>
        <Content title={menuItem.name} actionName="Back" action={back}>
          <div className="menu-item">
            <img
              className="menu-item__image"
              src={menuItem.image}
              alt={`${menuItem.name}`}
            />
            <span className="menu-item__price">
              ${(menuItem.price / 100).toFixed(2)}
            </span>
            <div className="menu-item__details">
              <span className="menu-item__description">
                {menuItem.description}
              </span>
            </div>
            {isMenuAdmin && menuItem && (
              <div className="menu-item__actions">
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
                    await deleteMenuItem(menuItem.id);
                  }}
                />
              </div>
            )}
          </div>
        </Content>
      </View>
    );
  }

  return null;
};
