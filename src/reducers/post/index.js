import { combineReducers } from "redux";

import { createReducer } from "../../utilities/reducer";

const itemName = "post";

export default createReducer(itemName, "slug");
export {
  getAllItems as getPosts,
  getItemById as getPostById
} from "../../utilities/reducer";
