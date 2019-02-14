import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as burgerMenu } from "redux-burger-menu";

import { wrap } from "../utilities/reducer";
import account, * as fromAccount from "./account";
import project, * as fromProject from "./project";
import campaign, * as fromCampaign from "./campaign";

/**
 * Checks if the burger menu is open
 * @param {Object} state The redux state
 * @returns {boolean} Whether the burger menu is open
 */
export const getBurgerMenuOpen = state => state.burgerMenu.isOpen;

export const getAccount = wrap(fromAccount.getAccount, state => state.account);
export const getVoteTokens = wrap(
  fromAccount.getVoteTokens,
  state => state.account
);
export const isFetchingAccount = wrap(
  fromAccount.isFetchingAccount,
  state => state.account
);

export const getCampaign = wrap(
  fromCampaign.getCampaign,
  state => state.campaign
);
export const isFetchingCampaign = wrap(
  fromCampaign.isFetchingCampaign,
  state => state.campaign
);

export const getProjects = wrap(
  fromProject.getProjects,
  state => state.project
);
export const isFetchingProject = wrap(
  fromProject.isFetchingProjects,
  state => state.project
);

export default combineReducers({
  routing: routerReducer,
  account,
  project,
  campaign,
  burgerMenu
});
