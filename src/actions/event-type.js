import {
  createFetchSingleItemAction,
  createFetchSingleItemThunk,
  createFetchAllItemsAction,
  createFetchAllItemsThunk
} from "utilities/action";
import { fetchApi } from "utilities/api";

export const itemName = "event-type";

/**
 * Maps an item so we can store it in the state
 * @param {Object} item The item to map
 * @returns {Object} The mapped item
 */
export const mapItem = ({ id, name }) => ({
  id,
  name
});

/**
 * Action called before and after fetching multiple items
 * @param {boolean} isFetching Whether it is currently being fetched
 * @param {string} status If there was an error during the request, this field should contain it
 * @param {object} items The received items
 * @returns {object} The redux action
 */
export const fetchItems = createFetchAllItemsAction(itemName);

export const fetchAll = createFetchAllItemsThunk(
  fetchItems,
  (page, { perPage = 15 }) =>
    `/wp-json/wp/v2/event_type?page=${page}&per_page=${perPage}`,
  mapItem
);
