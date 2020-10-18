import { MenuItem, MenuItems } from "../models/menu.types";
import { action, Action, thunk, Thunk } from "easy-peasy";
import history from "../history";
import { itemsPath, itemsReqUrl } from "./request-helpers";
import { StoreModel } from "./store";

export interface MenuModel {
  items: MenuItems;
  addItems: Action<MenuModel, MenuItems>;
  updateItem: Thunk<
    MenuModel,
    {
      id: number;
      data: MenuItem;
      token: string;
    },
    any,
    StoreModel
  >;
  deleteItem: Thunk<
    MenuModel,
    {
      id: number;
      token: string;
    },
    any,
    StoreModel
  >;
  fetchItems: Thunk<MenuModel, any, any, StoreModel>;
}

export const menuModel: MenuModel = {
  items: [],
  addItems: action((state, payload) => {
    state.items = payload;
  }),
  updateItem: thunk(async (actions, payload, { getStoreActions }) => {
    const { data, id, token } = payload;
    const { menuUi } = getStoreActions();

    const updateItemUrl = new URL(`${itemsPath}/${id.toString()}`, itemsReqUrl)
      .href;

    try {
      await menuUi.setLoading(true);

      await fetch(updateItemUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ item: data }),
      });

      await actions.fetchItems();

      await menuUi.setLoading(false);

      history.push(`/menu/${id}`);
    } catch (e) {
      menuUi.setError({
        error: true,
        message: e.message,
      });

      await menuUi.setLoading(false);
    }
  }),
  deleteItem: thunk(async (actions, payload, { getStoreActions }) => {
    const { id, token } = payload;
    const { menuUi } = getStoreActions();

    const deleteItemUrl = new URL(`${itemsPath}/${id.toString()}`, itemsReqUrl)
      .href;

    try {
      await menuUi.setLoading(true);

      await fetch(deleteItemUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      await actions.fetchItems();

      await menuUi.setLoading(false);

      await history.push("/menu");
    } catch (e) {
      menuUi.setError({
        error: true,
        message: e.message,
      });

      await menuUi.setLoading(false);
    }
  }),
  fetchItems: thunk(async (actions, payload, { getStoreActions }) => {
    const { menuUi } = getStoreActions();

    try {
      const res = await fetch(itemsReqUrl);
      const items: MenuItems = await res.json();

      actions.addItems(items);
    } catch (e) {
      menuUi.setError({
        error: true,
        message: e.message,
      });
    }
  }),
};
