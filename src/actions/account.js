import web3 from "../web3";

/**
 * Creates a redux action for fetching the account
 * @param {Error} error The potential error object
 * @param {boolean} isFetching If we are fetching the account
 * @param {string} account The account address
 * @returns {Object} The redux action
 */
const fetchAccountAction = (error, isFetching, account) => ({
  type: "FETCH_ACCOUNT",
  isFetching,
  error,
  account
});

/**
 * Fetches the current eth account
 * @returns {void}
 */
export const fetchAccount = () => dispatch => {
  dispatch(fetchAccountAction(false, true));
  web3.eth.getCoinbase((err, account) => {
    if (!err) {
      dispatch(fetchAccountAction(false, false, account));
    } else {
      dispatch(fetchAccountAction(err, false));
    }
  });
};
