import {
  createFetchSingleItemAction,
  createFetchSingleItemThunk,
  createFetchAllItemsAction,
  createFetchAllItemsThunk
} from "../utilities/action";
import { fetchApi } from "../utilities/api";
import { isoToDate } from "../utilities/format";

export const itemName = "algorithm";

/**
 * Maps an item so we can store it in the state
 * @param {Object} item The item to map
 * @returns {Object} The mapped item
 */
export const mapItem = ({
  id,
  slug,
  date,
  title: { rendered: title },
  content: { rendered: content },
  acf: algorithm,
  featured_media: thumbnailId
}) => ({
  id,
  slug,
  date,
  title,
  content,
  algorithm,
  thumbnailId
});

/**
 * Action called before and after fetching an item
 * @param {boolean} isFetching Whether it is currently being fetched
 * @param {string} status If there was an error during the request, this field should contain it
 * @param {object} item The received item
 * @returns {object} The redux action
 */
export const fetchItem = createFetchSingleItemAction(itemName);

/**
 * Fetches a algorithm by it's slug
 * @param {number} algorithmSlug The slug of the algorithm
 * @returns {function} The redux thunk
 */
export const fetchAlgorithm = algorithmSlug => dispatch => {
  dispatch(fetchItem(true, null, algorithmSlug));

  return fetchApi(`/wp-json/wp/v2/algorithm?slug=${algorithmSlug}`, {
    method: "GET"
  })
    .then(({ json: items }) => {
      if (items.length > 0) {
        dispatch(fetchItem(false, null, algorithmSlug, mapItem(items[0])));
      } else {
        dispatch(
          fetchItem(false, new Error("No algorithm was found"), algorithmSlug)
        );
      }
    })
    .catch(err => {
      dispatch(fetchItem(true, err, algorithmSlug));
    });
};

/**
 * Action called before and after fetching multiple items
 * @param {boolean} isFetching Whether it is currently being fetched
 * @param {string} status If there was an error during the request, this field should contain it
 * @param {object} items The received items
 * @returns {object} The redux action
 */
export const fetchItems = createFetchAllItemsAction(itemName);

/**
 * Fetches the lastes algorithms
 * @returns {function} The redux thunk
 */
export const fetchLatestAlgorithms = () => dispatch => {
  dispatch(fetchItems(true, null));

  return fetchApi(`/wp-json/wp/v2/algorithm?per_page=100`, {
    method: "GET"
  })
    .then(({ json: items }) => {
      dispatch(fetchItems(false, null, items.map(mapItem)));
    })
    .catch(err => {
      console.error(err);
      dispatch(fetchItems(false, err));
    });
};
