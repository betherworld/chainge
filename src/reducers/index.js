import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as burgerMenu } from "redux-burger-menu";

import { wrap } from "../utilities/reducer";
import page, * as fromPage from "./page";
import account, * as fromAccount from "./account";

/**
 * Checks if the burger menu is open
 * @param {Object} state The redux state
 * @returns {boolean} Whether the burger menu is open
 */
export const getBurgerMenuOpen = state => state.burgerMenu.isOpen;

export const getPageById = wrap(fromPage.getPageById, state => state.page);
export const getPages = wrap(fromPage.getPages, state => state.page);

export const getAccount = wrap(fromAccount.getAccount, state => state.account);
export const isFetchingAccount = wrap(
  fromAccount.isFetchingAccount,
  state => state.account
);

export default combineReducers({
  routing: routerReducer,
  page,
  account,
  burgerMenu
});
