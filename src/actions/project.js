import web3 from "../web3";
import { getAccount } from "../reducers";

/**
 * Maps a project
 * @param {Object} project The project object
 * @returns {Object} The mapped project
 */
const mapProject = project => ({
  title: project[0],
  description: project[1],
  voteCount: project[2],
  account: project[3]
});

/**
 * Creates a redux action for fetching the account
 * @param {Error} error The potential error object
 * @param {boolean} isFetching If we are fetching the account
 * @param {Array} projects An array of projects
 * @returns {Object} The redux action
 */
const fetchProjectsAction = (error, isFetching, projects) => ({
  type: "FETCH_PROJECTS",
  isFetching,
  error,
  projects
});

/**
 * Fetches the current eth account
 * @returns {void}
 */
export const fetchProjects = () => (dispatch, getState) => {
  dispatch(fetchProjectsAction(false, true));

  const account = getAccount(getState());

  const contract = new web3.eth.Contract(
    "JSON_CAMPAIGN_CONTRACT",
    "CAMPAIGN_CONTRACT_ADDRESS",
    {
      from: account
    }
  );

  return contract.methods.communityProjects
    .call()
    .then(communityProjects => {
      dispatch(
        fetchProjectsAction(null, false, communityProjects.map(mapProject))
      );
      return communityProjects;
    })
    .catch(error => {
      dispatch(fetchProjectsAction(error, false));
      return Promise.reject(error);
    });
};
