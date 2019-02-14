/**
 * campaign reducer
 * @param {Object} state The current state
 * @param {Object} action The redux action
 * @returns {Object} The new state
 */
const campaignReducer = (
  state = { isFetching: false, error: false, campaign: {} },
  action
) => {
  switch (action.type) {
    case "FETCH_CAMPAIGN":
      return {
        isFetching: action.isFetching,
        error: action.error,
        campaign:
          !action.error && !action.isFetching
            ? action.campaign
            : action.campaign
      };
    default:
      return state;
  }
};

export default campaignReducer;

/**
 * Gets the current account
 * @param {Object} state The redux state
 * @returns {Object} The current account
 */
export const getCampaign = state => state.campaign;

/**
 * Checks whether we are currently fetching
 * @param {Object} state The redux state
 * @returns {boolean} Whether we are fetching
 */
export const isFetchingCampaign = state => state.isFetching;
