import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as burgerMenu } from "redux-burger-menu";

import { wrap } from "../utilities/reducer";
import account, * as fromAccount from "./account";

/**
 * Checks if the burger menu is open
 * @param {Object} state The redux state
 * @returns {boolean} Whether the burger menu is open
 */
export const getBurgerMenuOpen = state => state.burgerMenu.isOpen;

export const getAccount = wrap(fromAccount.getAccount, state => state.account);
export const isFetchingAccount = wrap(
  fromAccount.isFetchingAccount,
  state => state.account
);

export default combineReducers({
  routing: routerReducer,
  account,
  burgerMenu
});
