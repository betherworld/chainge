/**
 * Stores the actions
 * @param {Object} state The redux state
 * @param {Object} action The redux action
 * @returns {Object} The new state
 */
const actionReducer = (
  state = {
    error: null,
    isFetching: false,
    actions: [
      {
        index: 0,
        title: "Plant a tree at x/y/z",
        description: "Yelling timber! Uh eh no, whoops",
        reward: 10,
        done: false,
        proofingType: 0,
        verified: false,
        submissionData: "",
        user: ""
      },
      {
        index: 1,
        title: "Another brick in the wall",
        description: "Make romania great again!",
        reward: 5,
        done: false,
        proofingType: 0,
        verified: false,
        submissionData: "",
        user: ""
      }
    ]
  },
  action
) => {
  switch (action.type) {
    case "FETCH_ACTIONS":
      return {
        error: action.error,
        isFetching: action.isFetching,
        actions:
          !action.error && !action.isFetching ? action.actions : state.actions
      };
    case "SUBMIT_ACTION":
      if (!action.error && !action.isFetching) {
        return {
          ...state,
          actions: state.actions.map(a =>
            a.index == action.actionIndex ? { ...a, done: true } : a
          )
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default actionReducer;

/**
 * Gets the current account
 * @param {Object} state The redux state
 * @returns {Object} The current account
 */
export const getActions = state => state.actions;

/**
 * Checks whether we are currently fetching
 * @param {Object} state The redux state
 * @returns {boolean} Whether we are fetching
 */
export const isFetchingActions = state => state.isFetching;
