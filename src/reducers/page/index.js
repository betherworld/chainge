import { combineReducers } from "redux";

import { createReducer } from "../../utilities/reducer";

const itemName = "page";

export default createReducer(itemName, "slug");
export {
  getAllItems as getPages,
  getItemById as getPageById
} from "../../utilities/reducer";
