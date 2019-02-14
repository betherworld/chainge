/**
 * Stores the projects
 * @param {Object} state The redux state
 * @param {Object} action The redux action
 * @returns {Object} The new state
 */
const projectReducer = (
  state = {
    error: null,
    isFetching: false,
    projects: [
      {
        title: "Green houses for everyone",
        description: "Green is love, green is life <3",
        voteCount: 27
      },
      {
        title: "Free beer fridays",
        description: "We want beer! We want beer!",
        voteCount: 239
      }
    ]
  },
  action
) => {
  switch (action.type) {
    case "FETCH_PROJECTS":
      return {
        error: action.error,
        isFetching: action.isFetching,
        projects:
          !action.error && !action.isFetching ? action.projects : state.projects
      };
    case "VOTE_FOR_PROJECT":
      return !action.error && !action.isFetching
        ? {
            ...state,
            projects: state.projects.map(project => ({
              ...project,
              voteCount:
                action.projectIndex === project.index
                  ? project.voteCount + 1
                  : project.voteCount
            }))
          }
        : state;
    default:
      return state;
  }
};

export default projectReducer;

/**
 * Gets the current account
 * @param {Object} state The redux state
 * @returns {Object} The current account
 */
export const getProjects = state => state.projects;

/**
 * Checks whether we are currently fetching
 * @param {Object} state The redux state
 * @returns {boolean} Whether we are fetching
 */
export const isFetchingProjects = state => state.isFetching;
