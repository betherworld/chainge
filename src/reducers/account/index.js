/**
 * Account reducer
 * @param {Object} state The current state
 * @param {Object} action The redux action
 * @returns {Object} The new state
 */
const accountReducer = (
  state = { isFetching: false, error: false, account: "", voteTokens: 0 },
  action
) => {
  switch (action.type) {
    case "FETCH_ACCOUNT":
      return {
        isFetching: action.isFetching,
        error: action.error,
        account:
          !action.error && !action.isFetching ? action.account : action.account,
        voteTokens:
          !action.error && !action.isFetching
            ? action.voteTokens
            : action.voteTokens
      };
    case "VOTE_FOR_PROJECT":
      return !action.error && !action.isFetching
        ? { ...state, voteTokens: state.voteTokens - 1 }
        : state;
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
 * Gets the amount of vote tokens
 * @param {Object} state The redux state
 * @returns {Object} The current amount of vote tokens
 */
export const getVoteTokens = state => state.voteTokens;

/**
 * Checks whether we are currently fetching
 * @param {Object} state The redux state
 * @returns {boolean} Whether we are fetching
 */
export const isFetchingAccount = state => state.isFetching;
