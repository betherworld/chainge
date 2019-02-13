/**
 * Account reducer
 * @param {Object} state The current state
 * @param {Object} action The redux action
 * @returns {Object} The new state
 */
const accountReducer = (
  state = { isFetching: false, error: false, account: "" },
  action
) => {
  switch (action.type) {
    case "FETCH_ACCOUNT":
      return {
        isFetching: action.isFetching,
        error: action.error,
        account:
          !action.error && !action.isFetching ? action.account : action.account
      };
    default:
      return state;
  }
};

export default accountReducer;

/**
 * Gets the current account
 * @param {Object} state The redux state
 * @returns {Object} The current account
 */
export const getAccount = state => state.account;

/**
 * Checks whether we are currently fetching
 * @param {Object} state The redux state
 * @returns {boolean} Whether we are fetching
 */
export const isFetchingAccount = state => state.account;
