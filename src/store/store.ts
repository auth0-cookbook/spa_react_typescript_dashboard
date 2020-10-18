import { createStore, createTypedHooks } from "easy-peasy";

import { menuModel, MenuModel } from "./menu-store.";
import { menuUiModel, MenuUIModel } from "./menu-ui-store.";
import { userModel, UserModel } from "./user-store.";

export interface StoreModel {
  menu: MenuModel;
  menuUi: MenuUIModel;
  user: UserModel;
}

const model: StoreModel = {
  menu: menuModel,
  menuUi: menuUiModel,
  user: userModel,
};

export const store = createStore<StoreModel>(model);

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
