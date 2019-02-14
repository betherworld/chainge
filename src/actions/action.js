import { campaignContract } from "../web3/contracts/CampaignContract";

/**
 * Maps an action
 * @param {Object} project The action object
 * @param {number} index The array index
 * @returns {Object} The mapped action
 */
const mapAction = (project, index) => ({
  index,
  title: project[0],
  description: project[1],
  reward: parseInt(project[2]),
  done: project[3],
  proofingType: parseInt(project[4]),
  verified: project[5],
  submissionData: project[6],
  user: project[7]
});

/**
 * Creates a redux action for fetching the account
 * @param {Error} error The potential error object
 * @param {boolean} isFetching If we are fetching the account
 * @param {Array} actions An array of actions
 * @returns {Object} The redux action
 */
const fetchActionsAction = (error, isFetching, actions) => ({
  type: "FETCH_ACTIONS",
  isFetching,
  error,
  actions
});

/**
 * Fetches the current eth account
 * @returns {void}
 */
export const fetchActions = () => dispatch => {
  dispatch(fetchActionsAction(false, true));

  return new Promise((resolve, reject) => {
    campaignContract.getActionsLength.call((error, length) => {
      if (error) {
        return reject(error);
      }

      length = parseInt(length);

      /**
       * Fetches an action
       * @param {number} index The action index
       * @returns {Promise} the fetch promise
       */
      const getActionByIndex = index => {
        return new Promise((resolve, reject) => {
          campaignContract.actions(index, (error, result) => {
            if (error) {
              return reject(error);
            }

            return resolve(result);
          });
        });
      };

      return Promise.all(
        new Array(length).fill().map((_e, i) => getActionByIndex(i))
      )
        .then(actions => {
          dispatch(fetchActionsAction(null, false, actions.map(mapAction)));

          return actions;
        })
        .catch(error => {
          dispatch(fetchActionsAction(error, false));
          return Promise.reject(error);
        });
    });
  });
};
