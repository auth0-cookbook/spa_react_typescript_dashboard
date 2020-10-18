import { action, Action } from "easy-peasy";
import { MenuError } from "../models/menu.types";

export interface MenuUIModel {
  isMenuLoading: boolean;
  setLoading: Action<MenuUIModel, boolean>;
  menuError: MenuError | null;
  setError: Action<MenuUIModel, MenuError | null>;
}
export const menuUiModel: MenuUIModel = {
  isMenuLoading: false,
  setLoading: action((state, payload) => {
    state.isMenuLoading = payload;
  }),
  menuError: null,
  setError: action((state, payload) => {
    state.menuError = payload;
  }),
};
