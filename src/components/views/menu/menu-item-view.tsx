import React from "react";

import { View, ViewStates } from "../../layout/view";
import { Content } from "../../layout/content";

import { useHistory, useParams } from "react-router-dom";
import { useMenuAdmin } from "../../../hooks/use-menu-admin";
import { useMenuItem } from "../../../hooks/use-menu-item";

import { FetchState } from "../../../models/menu.types";

import "./menu-item-view.scss";
import { OutlineButton } from "../../ui/outline-button";

export const MenuItemView: React.FC = () => {
  const history = useHistory();
  const { menuItemId } = useParams();
  const itemId = menuItemId;

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
        <OutlineButton
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
            {isMenuAdmin && menuItem && (
              <div className="menu-item__actions">
                <OutlineButton
                  label="Edit"
                  action={() => {
                    menuItem && history.push(`/menu/${menuItem.id}/edit-item/`);
                  }}
                />
                <OutlineButton
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
