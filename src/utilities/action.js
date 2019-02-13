import pluralize from "pluralize";
import changeCase from "change-case";

import { fetchApi } from "./api";

/**
 * Creates a redux action for fetching one item of a type
 * @param {string} name The singular name of the item type
 * @returns {function} The redux action
 */
export const createFetchSingleItemAction = name => (
  isFetching,
  status,
  itemId,
  item
) => ({
  type: "FETCH_" + changeCase.snakeCase(name).toUpperCase(),
  isFetching,
  status,
  itemId,
  item
});

/**
 * Creates a redux thunk that fetches a single item of a certain type
 * @param {function} action The action that should be dispatched
 * @param {function} endpoint A function generating the endpoint url based on the item id and the passed arguments
 * @param {function} mapItem A function mapping the item into the desired format
 * @returns {function} The redux thunk
 */
export const createFetchSingleItemThunk = (
  action,
  endpoint,
  mapItem = item => item
) => (itemId, args = {}) => dispatch => {
  dispatch(action(true, null, itemId));

  return fetchApi(endpoint(itemId, args), {
    method: "GET"
  })
    .then(({ json: item }) => {
      const mappedItem = mapItem(item);

      dispatch(action(false, null, itemId, mappedItem));

      return Promise.resolve({ item, originalItem: item });
    })
    .catch(error => {
      dispatch(action(false, error, itemId));

      return Promise.reject(error);
    });
};

/**
 * Creates a redux action for fetching all items of a type
 * @param {string} name The singular name of the item type
 * @returns {function} The redux action
 */
export const createFetchAllItemsAction = name => (
  isFetching,
  status,
  items
) => ({
  type: "FETCH_" + changeCase.snakeCase(pluralize(name)).toUpperCase(),
  isFetching,
  status,
  items
});

/**
 * Fetches all items by using a pagination
 * @param {function} dispatch The redux dispatch function
 * @param {function} action The action that should be dispatched
 * @param {function} endpoint A function generating the endpoint url based on the page and the number of items per page
 * @param {function} mapItem A function mapping the item into the desired format
 * @returns {promise} A promise yielding all items or an error
 */
export const createFetchItemsPageThunk = (
  dispatch,
  action,
  endpoint,
  mapItem = item => item
) => (page = 1, pageTo = -1, args) =>
  fetchApi(endpoint(page, args), {
    method: "GET"
  }).then(({ json: items, response }) => {
    const total = parseInt(response.headers.get("x-wp-total"));
    const { perPage = 15 } = args;

    const mappedItems = items.map(mapItem);
    dispatch(action(false, null, mappedItems));

    if (
      (page - 1) * perPage + items.length < total &&
      (pageTo > 0 ? page < pageTo : true)
    ) {
      return createFetchItemsPageThunk(dispatch, action, endpoint, mapItem)(
        page + 1,
        pageTo,
        args
      ).then(({ items: nextItems, originalItems: newOriginalItems }) =>
        Promise.resolve({
          items: [...mappedItems, ...nextItems],
          originalItems: [...items, ...newOriginalItems]
        })
      );
    }
    return Promise.resolve({ items: mappedItems, originalItems: items });
  });

/**
 * Creates a redux thunk that fetches all items of a certain type
 * @param {function} action The redux action to dispatch
 * @param {function} endpoint A function generating the endpoint url based on the page and the number of items per page
 * @param {function} mapItem A function mapping the item into the desired format
 * @returns {function} The redux thunk
 */
export const createFetchAllItemsThunk = (
  action,
  endpoint,
  mapItem = item => item
) => (args = {}) => dispatch => {
  dispatch(action(true, null));

  return createFetchItemsPageThunk(dispatch, action, endpoint, mapItem)(
    1,
    -1,
    args
  )
    .then(({ items }) => {
      dispatch(action(false, null, items));

      return Promise.resolve(items);
    })
    .catch(error => {
      dispatch(action(false, error, []));

      return Promise.reject(error);
    });
};

/**
 * Creates a redux action for creating an item of a type
 * @param {string} name The singular name of the item type
 * @returns {function} The redux action
 */
export const createCreateItemAction = name => (isFetching, status, item) => ({
  type: "CREATE_" + changeCase.snakeCase(name).toUpperCase(),
  isFetching,
  status,
  item
});

/**
 * Creates a redux thunk that creates an item of a certain type
 * @param {function} action The action that should be dispatched
 * @param {function} endpoint A function generating the endpoint url based on the item and the passed args
 * @param {function} mapItem A function mapping the item into the desired format
 * @returns {function} The redux thunk
 */
export const createCreateItemThunk = (
  action,
  endpoint,
  mapItem = item => item
) => (item, args = {}) => dispatch => {
  dispatch(action(true, null, item));

  return fetchApi(endpoint(item, args), {
    method: "POST",
    body: JSON.stringify(item)
  })
    .then(({ json: item }) => {
      const mappedItem = mapItem(item);

      dispatch(action(false, null, mappedItem));

      return Promise.resolve({ item, originalItem: item });
    })
    .catch(error => {
      dispatch(action(false, error, item));

      return Promise.reject(error);
    });
};

/**
 * Creates a redux action for updating an item of a type
 * @param {string} name The singular name of the item type
 * @returns {function} The redux action
 */
export const createUpdateItemAction = name => (isFetching, status, item) => ({
  type: "UPDATE_" + changeCase.snakeCase(name).toUpperCase(),
  isFetching,
  status,
  item
});

/**
 * Creates a redux thunk that updates an item of a certain type
 * @param {function} action The action that should be dispatched
 * @param {function} endpoint A function generating the endpoint url based on the item and the passed args
 * @param {function} mapItem A function mapping the item into the desired format
 * @returns {function} The redux thunk
 */
export const createUpdateItemThunk = (
  action,
  endpoint,
  mapItem = item => item
) => (token, itemId, item, args = {}) => dispatch => {
  dispatch(action(true, null, itemId, item));

  return fetchApi(endpoint(itemId, item, args), {
    method: "PUT",
    body: JSON.stringify(item),
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    })
  })
    .then(({ json: item }) => {
      const mappedItem = mapItem(item);

      dispatch(action(false, null, itemId, mappedItem));

      return Promise.resolve({ item, originalItem: item });
    })
    .catch(error => {
      dispatch(action(false, error, itemId, item));

      return Promise.reject(error);
    });
};
