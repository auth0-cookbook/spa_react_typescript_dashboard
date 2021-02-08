import React from "react";

import { View, ViewStates } from "../../layout/view";
import { Content } from "../../layout/content";

import { FetchState } from "../../../models/menu.types";

import { useHistory, useParams } from "react-router-dom";

import { Loader } from "../../ui/loader";
import { useMenuAdmin } from "../../../hooks/use-menu-admin";
import { useMenu } from "../../../context/menu-context";
import { useMenuItem } from "../../../hooks/use-menu-item";

import "./delete-item-view.scss";
import { Button } from "../../ui/button";

export const DeleteItemView = () => {
  const history = useHistory();
  const { menuItemId } = useParams();

  const isMenuAdmin = useMenuAdmin();
  const { deleteMenuItem } = useMenu();

  const { menuItem, fetchState } = useMenuItem(menuItemId);

  const cancel = async () => {
    await history.push(`/menu/${menuItemId}`);
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
      <Content title="Delete Menu Item" actionName="Back" action={cancel}>
        {menuItem && (
          <div className="delete-item__confirmation-box">
            <span className="delete-item__question-text">
              Are you sure you want to delete this item?
            </span>
            <span className="delete-item__warning-text">
              This action can't be undone.
            </span>
            <div className="delete-item__item-box">
              <div
                className="delete-item__item-image"
                style={{
                  background: `url(${menuItem.image})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "auto 100%",
                  backgroundPosition: "center",
                }}
              />
              <div className="delete-item__item-info">
                <span className="delete-item__item-name">{menuItem.name}</span>
                <span className="delete-item__item-tagline">
                  {menuItem.tagline}
                </span>
                <span className="delete-item__item-description">
                  {menuItem.description}
                </span>
                <span>${menuItem.price / 100}</span>
                <span>{menuItem.calories} calories</span>
              </div>
            </div>
            <div className="delete-item__options">
              <div className="form__actions">
                <Button
                  variant="outline"
                  action={() => menuItem && deleteMenuItem(menuItem.id)}
                  label="Delete"
                />
                <Button variant="text" action={cancel} label="Cancel" />
              </div>
            </div>
          </div>
        )}
      </Content>
    </View>
  );
};
