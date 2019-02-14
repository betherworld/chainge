import web3 from "../web3";
import { campaignContract } from "../web3/contracts/CampaignContract";

/**
 * Creates a redux action for fetching the account
 * @param {Error} error The potential error object
 * @param {boolean} isFetching If we are fetching the account
 * @param {string} account The account address
 * @param {number} voteTokens The amount of vote tokens
 * @returns {Object} The redux action
 */
const fetchAccountAction = (error, isFetching, account, voteTokens) => ({
  type: "FETCH_ACCOUNT",
  isFetching,
  error,
  account,
  voteTokens
});

/**
 * Fetches the current eth account
 * @returns {void}
 */
export const fetchAccount = () => dispatch => {
  dispatch(fetchAccountAction(false, true));
  web3.eth.getCoinbase((err, account) => {
    if (!err) {
      campaignContract.getGatherersToken.call(account, (err, voteTokens) => {
        if (err) {
          return dispatch(fetchAccountAction(err, false));
        }

        dispatch(
          fetchAccountAction(false, false, account, parseInt(voteTokens))
        );
      });
    } else {
      dispatch(fetchAccountAction(err, false));
    }
  });
};
