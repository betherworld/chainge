import { campaignContract } from "../web3/contracts/CampaignContract";

/**
 * Maps a project
 * @param {Object} project The project object
 * @param {number} index The array index
 * @returns {Object} The mapped project
 */
const mapProject = (project, index) => ({
  index,
  title: project[0],
  description: project[1],
  voteCount: parseInt(project[2]),
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
export const fetchProjects = () => dispatch => {
  dispatch(fetchProjectsAction(false, true));

  return new Promise((resolve, reject) => {
    campaignContract.getCommunityProjectsLength.call((error, length) => {
      if (error) {
        return reject(error);
      }

      length = parseInt(length);

      /**
       * Fetches a project
       * @param {number} id The project id
       * @returns {Promise} the fetch promise
       */
      const getCommunityProjectById = id => {
        return new Promise((resolve, reject) => {
          campaignContract.communityProjects(id, (error, result) => {
            if (error) {
              return reject(error);
            }

            return resolve(result);
          });
        });
      };

      return Promise.all(
        new Array(length).fill().map((_e, i) => getCommunityProjectById(i))
      )
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
    });
  });
};

/**
 * Creates a redux action for fetching the account
 * @param {Error} error The potential error object
 * @param {boolean} isFetching If we are fetching the account
 * @param {number} projectIndex The index of this project
 * @returns {Object} The redux action
 */
const voteForProjectAction = (error, isFetching, projectIndex) => ({
  type: "VOTE_FOR_PROJECT",
  isFetching,
  error,
  projectIndex
});

/**
 * Votes for a project
 * @param {number} projectIndex The index of the project
 * @returns {Promise} The fetch promise
 */
export const voteForProject = projectIndex => dispatch => {
  dispatch(voteForProjectAction(false, true));

  return new Promise((resolve, reject) => {
    campaignContract.vote(projectIndex, 1, error => {
      if (error) {
        return reject(error);
      }

      resolve(dispatch(voteForProjectAction(false, false, projectIndex)));
    });
  }).catch(error => {
    dispatch(voteForProjectAction(error, false, projectIndex));
    return Promise.reject(error);
  });
};
