import {
  createFetchSingleItemAction,
  createFetchSingleItemThunk,
  createFetchAllItemsAction,
  createFetchAllItemsThunk
} from "utilities/action";

import { fetchApi } from "utilities/api";
import { isoToDate } from "../utilities/format";

export const itemName = "post";

/**
 * Maps an item so we can store it in the state
 * @param {object} item The item to map
 * @return {object} The mapped item
 */
export const mapItem = ({
  id,
  slug,
  date,
  title: { rendered: title },
  content: { rendered: content },
  excerpt: { rendered: excerpt },
  featured_media: thumbnailId
}) => ({
  id,
  slug,
  date: isoToDate(date),
  title,
  content,
  excerpt,
  thumbnailId,
  thumbnailUrl: null,
  instagram: false
});

const mapInstagramItem = ({
  id,
  taken_at_timestamp: timestamp,
  display_url: thumbnailUrl,
  edge_media_to_caption: { edges },
  shortcode
}) => ({
  id,
  slug: shortcode,
  date: new Date(timestamp * 1000),
  title: "",
  content: "",
  excerpt: `<div><p>${edges[0] && edges[0].node.text}</p></div>`,
  thumbnailId: null,
  thumbnailUrl,
  instagram: true
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
 * Fetches a post by it's slug
 * @param {number} postSlug The slug of the post
 * @return {function} The redux thunk
 */
export const fetch = postSlug => dispatch => {
  dispatch(fetchItem(true, null, postSlug));

  return fetchApi(`/wp-json/wp/v2/posts?slug=${postSlug}`, {
    method: "GET"
  })
    .then(({ json: items }) => {
      if (items.length > 0) {
        dispatch(fetchItem(false, null, postSlug, mapItem(items[0])));
      } else {
        dispatch(fetchItem(false, new Error("No post was found"), postSlug));
      }
    })
    .catch(err => {
      dispatch(fetchItem(true, err, postSlug));
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

export const fetchLatest = () => dispatch => {
  dispatch(fetchItems(true, null));

  return fetchApi(
    `/wp-json/wp/v2/posts?per_page=100&after=${new Date().getFullYear()}-01-01T00:00:00`,
    {
      method: "GET"
    }
  )
    .then(({ json: items }) => {
      dispatch(fetchItems(false, null, items.map(mapItem)));
    })
    .catch(err => {
      dispatch(fetchItems(true, err));
    });
};
