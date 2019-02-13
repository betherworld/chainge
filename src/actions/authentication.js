import { fetchApi } from "utilities/api";

/**
 * Action called before and after fetching the JWT token
 * @param {boolean} isFetching Whether the token is currently being fetched
 * @param {string} status If there was an error during the request, this field should contain it
 * @param {Object} token The received token
 * @returns {Object} The redux action
 */
const fetchJwtToken = (isFetching, status, token) => ({
  type: "FETCH_JWT_TOKEN",
  isFetching,
  token,
  status
});

/**
 * Verifies the jwt token
 * @param {boolean} verified Whether the jtw token could be verified
 * @returns {Object} The redux action
 */
const verifyJwtToken = (verified = undefined) => ({
  type: "VERIFY_JWT_TOKEN",
  verified
});

/**
 * Logs the user out and resets the jwt token
 * @returns {Object} The redux action
 */
export const resetJwtToken = () => ({
  type: "RESET_JWT_TOKEN"
});

/**
 * Action called before and after fetching the authenticated user
 * @param {boolean} isFetching Whether the token is currently being fetched
 * @param {string} status If there was an error during the request, this field should contain it
 * @param {Object} user The received user
 * @returns {Object} The redux action
 */
const fetchAuthUser = (isFetching, status, user) => ({
  type: "FETCH_AUTH_USER",
  isFetching,
  user,
  status
});

/**
 * Logs a user in using a jwt token
 * @param {string} login The user's login (email or username)
 * @param {string} password The user's password
 * @returns {function} A redux thunk
 */
export const login = (login, password) => dispatch => {
  dispatch(fetchJwtToken(true, null));
  dispatch(fetchAuthUser(true, null));

  return fetchApi("/api/users/login", {
    method: "POST",
    body: JSON.stringify({ login, password })
  })
    .then(({ token, data }) => {
      dispatch(fetchJwtToken(false, null, token));
      dispatch(fetchAuthUser(false, null, data));

      localStorage.setItem("jwt-token", token);

      return Promise.resolve(token);
    })
    .catch(error => {
      dispatch(fetchJwtToken(false, error, null));
      dispatch(fetchAuthUser(false, error, {}));

      localStorage.removeItem("jwt-token", null);

      return Promise.reject(error);
    });
};

/**
 * Action called before and after registering a user
 * @param {boolean} isFetching Whether the token is currently being fetched
 * @param {string} status If there was an error during the request, this field should contain it
 * @returns {Object} The redux action
 */
const registerUser = (isFetching, status) => ({
  type: "REGISTER_USER",
  isFetching,
  status
});

/**
 * Registers a new user
 * @param {string} name The user's (first) name
 * @param {string} lastname The user's lastname
 * @param {string} username The user's username
 * @param {string} email The user's email
 * @param {string} password The user's password
 * @returns {function} A redux thunk
 */
export const register = (
  name,
  lastname,
  username,
  email,
  password
) => dispatch => {
  dispatch(registerUser(true, null));

  return fetchApi("/api/users/register", {
    method: "POST",
    body: JSON.stringify({ name, lastname, username, email, password })
  })
    .then(({ token, data }) => {
      dispatch(fetchJwtToken(false, null, token));
      dispatch(fetchAuthUser(false, null, data));
      dispatch(registerUser(false, null));

      localStorage.setItem("jwt-token", token);

      return Promise.resolve(token);
    })
    .catch(error => {
      dispatch(fetchJwtToken(false, error, null));
      dispatch(fetchAuthUser(false, error, {}));
      dispatch(registerUser(false, error));

      localStorage.removeItem("jwt-token", null);

      return Promise.reject(error);
    });
};

/**
 * Action called before and after resetting a user's password
 * @param {boolean} isFetching Whether the token is currently being fetched
 * @param {string} status If there was an error during the request, this field should contain it
 * @returns {Object} The redux action
 */
const resetPassword = (isFetching, status) => ({
  type: "REGISTER_USER",
  isFetching,
  status
});

/**
 * Resets a user's password
 * @param {string} email The user's email
 * @returns {function} A redux thunk
 */
export const reset = email => dispatch => {
  dispatch(resetPassword(true, null));

  return fetchApi("/api/users/password-reset", {
    method: "POST",
    body: JSON.stringify({ email })
  })
    .then(({ message }) => {
      dispatch(resetPassword(false, null));

      return Promise.resolve(token);
    })
    .catch(error => {
      dispatch(resetPassword(false, error));

      return Promise.reject(error);
    });
};

/**
 * Verifies the passed jwt token
 * @param {Object} token
 * @returns {function} A redux thunk
 */
export const verifyToken = () => dispatch => {
  dispatch(verifyJwtToken());

  return fetchApi("/api/users/me", {
    method: "POST"
  })
    .then(user => {
      dispatch(verifyJwtToken(true));
    })
    .catch(error => {
      dispatch(fetchJwtToken(false));

      return Promise.reject(error);
    });
};

/**
 * Verifies the passed jwt token
 * @param {Object} token
 * @returns {function} A redux thunk
 */
export const fetchAuthenticatedUser = token => dispatch => {
  dispatch(fetchAuthUser(true, null));

  return fetchApi("/api/users/me", {
    method: "GET"
  })
    .then(user => {
      dispatch(fetchAuthUser(false, null, user));
    })
    .catch(error => {
      dispatch(fetchAuthUser(false, error));

      return Promise.reject(error);
    });
};
