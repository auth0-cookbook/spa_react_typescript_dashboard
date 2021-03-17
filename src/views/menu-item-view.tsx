import React from "react";

import { View, ViewStates } from "../components/layout/view";
import { Content } from "../components/layout/content";

import { useHistory, useParams } from "react-router-dom";
import { useAccessRoles } from "../components/security/use-access-roles";
import { useMenuItem } from "../utils/use-menu-item";

import { FetchState } from "../models/menu.types";

import "./menu-item-view.scss";
import { Button } from "../components/ui/button";
import { USER_ROLES } from "../components/security/user-roles";

export const MenuItemView: React.FC = () => {
  const history = useHistory();
  const { menuItemId } = useParams();
  const itemId = menuItemId;

  const { accessRoles } = useAccessRoles();
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
        <Button
          variant="outline"
          label="View menu items"
          action={() => history.push("/menu")}
        />
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
            <div className="menu-item__info">
              <div className="menu-item__data">
                <span className="menu-item__price">
                  ${menuItem.price / 100}
                </span>
                <span className="menu-item__calories">
                  {menuItem.calories} calories
                </span>
              </div>
              <div className="menu-item__details">
                <span className="menu-item__tagline">{menuItem.tagline}</span>
                <br />
                <br />
                <span>{menuItem.description}</span>
              </div>
            </div>
            {accessRoles[USER_ROLES.MENU_ADMIN] && menuItem && (
              <div className="menu-item__actions">
                <Button
                  variant="outline"
                  label="Edit"
                  action={() => {
                    menuItem && history.push(`/menu/${menuItem.id}/edit-item/`);
                  }}
                />
                <Button
                  variant="outline"
                  label="Delete"
                  action={() => {
                    menuItem &&
                      history.push(`/menu/${menuItem.id}/delete-item/`);
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
