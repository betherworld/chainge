import {
  createFetchSingleItemAction,
  createFetchSingleItemThunk,
  createFetchAllItemsAction,
  createFetchAllItemsThunk
} from "../utilities/action";
import { fetchApi } from "../utilities/api";
import { isoToDate } from "../utilities/format";

export const itemName = "project";

/**
 * Maps a collaborator
 * @param {Object} collaborator The given object
 * @returns {Object} The mapped collaborator
 */
const mapCollaborator = ({ post_title: collaborator }) => collaborator;

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
  acf: {
    custom_color: customColor = "#000",
    year,
    url,
    client,
    client_url: clientUrl,
    license: { post_title: license },
    show_title_with_logo: showTitleWithLogo = false,
    collaborators
  },
  featured_media: thumbnailId
}) => ({
  id,
  slug,
  date,
  title,
  showTitleWithLogo,
  content,
  thumbnailId,
  customColor,
  year: parseInt(year),
  url,
  client,
  clientUrl,
  license,
  collaborators: collaborators ? collaborators.map(mapCollaborator) : []
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
 * Fetches a projects by it's slug
 * @param {number} projectSlug The slug of the project
 * @returns {function} The redux thunk
 */
export const fetchProject = projectSlug => dispatch => {
  dispatch(fetchItem(true, null, projectSlug));

  return fetchApi(`/wp-json/wp/v2/portfolio?slug=${projectSlug}`, {
    method: "GET"
  })
    .then(({ json: items }) => {
      if (items.length > 0) {
        dispatch(fetchItem(false, null, projectSlug, mapItem(items[0])));
      } else {
        dispatch(
          fetchItem(
            false,
            new Error("No portfolio entry was found"),
            projectSlug
          )
        );
      }
    })
    .catch(err => {
      dispatch(fetchItem(true, err, projectSlug));
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
 * Fetches the lastes projects
 * @returns {function} The redux thunk
 */
export const fetchLatestProjects = () => dispatch => {
  dispatch(fetchItems(true, null));

  return fetchApi(`/wp-json/wp/v2/portfolio?per_page=100`, {
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
