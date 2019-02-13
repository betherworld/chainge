import { createFetchSingleItemAction } from "../utilities/action";
import { fetchApi } from "../utilities/api";

export const itemName = "page";

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
  content: { rendered: content }
}) => ({
  id,
  slug,
  date,
  title,
  content
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
 * Fetches a page by it's slug
 * @param {number} pageSlug The slug of the page
 * @returns {function} The redux thunk
 */
export const fetch = pageSlug => dispatch => {
  dispatch(fetchItem(true, null, pageSlug));

  return fetchApi(`/wp-json/wp/v2/pages?slug=${pageSlug}`, {
    method: "GET"
  })
    .then(({ json: items }) => {
      if (items.length > 0) {
        dispatch(fetchItem(true, null, pageSlug, mapItem(items[0])));
      } else {
        dispatch(fetchItem(true, new Error("No page was found"), pageSlug));
      }
    })
    .catch(err => {
      dispatch(fetchItem(true, err, pageSlug));
    });
};
