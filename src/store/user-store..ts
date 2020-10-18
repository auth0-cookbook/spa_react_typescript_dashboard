import { action, Action } from "easy-peasy";

export interface UserModel {
  isMenuAdmin: boolean;
  updateAdmin: Action<UserModel, boolean>;
  menuAdminRole: string;
}

export const userModel: UserModel = {
  isMenuAdmin: false,
  menuAdminRole: "menu-admin",
  updateAdmin: action((state, payload) => {
    state.isMenuAdmin = payload;
  }),
};
