import { combineReducers } from "redux";

import { wrap } from "../../utilities/reducer";
import user, * as fromAuthenticatedUser from "./user";

/**
 * Stores whether the user is authenticated
 * @param {boolean} state The current state
 * @param {Object} action The redux action
 * @returns {boolean} The new state
 */
const isAuthenticated = (
  state = localStorage.getItem("jwt-token") ? true : false,
  action
) => {
  switch (action.type) {
    case "FETCH_JWT_TOKEN":
      return !action.isFetching && action.token;
    case "RESET_JWT_TOKEN":
      return false;
    default:
      return state;
  }
};

/**
 * Stores whether the user is authenticating
 * @param {boolean} state The current state
 * @param {Object} action The redux action
 * @returns {boolean} The new state
 */
const isFetching = (state = false, action) => {
  switch (action.type) {
    case "FETCH_JWT_TOKEN":
      return action.isFetching;
    case "RESET_JWT_TOKEN":
      return false;
    default:
      return state;
  }
};

/**
 * Stores whether the authentication status
 * @param {boolean} state The current state
 * @param {Object} action The redux action
 * @returns {boolean} The new state
 */
const status = (state = null, action) => {
  switch (action.type) {
    case "FETCH_JWT_TOKEN":
      return action.status;
    case "RESET_JWT_TOKEN":
      return action.status;
    default:
      return state;
  }
};

export default combineReducers({ isAuthenticated, isFetching, status, user });

/**
 * Checks if the user is authenticated
 * @param {Object} state A part of the redux state
 * @returns {boolean} Whether the user is authenticated
 */
export const getIsAuthenticated = state => state.isAuthenticated;
/**
 * Checks if the user is authenticating
 * @param {Object} state A part of the redux state
 * @returns {boolean} Whether the user is authenticated
 */
export const getIsAuthenticating = state => state.isFetching;
/**
 * Gets the users authentication status
 * @param {Object} state A part of the redux state
 * @returns {boolean} Whether the user is authenticated
 */
export const getAuthenticationStatus = state => state.status;

export const getAuthenticatedUser = wrap(
  fromAuthenticatedUser.getAuthenticatedUser,
  state => state.user
);
export const getAuthenticatedUserFetching = wrap(
  fromAuthenticatedUser.getAuthenticatedUserFetching,
  state => state.user
);
export const getAuthenticatedUserStatus = wrap(
  fromAuthenticatedUser.getAuthenticatedUserStatus,
  state => state.user
);
