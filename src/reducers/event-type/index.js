import { combineReducers } from "redux";

import { createReducer } from "../../utilities/reducer";

const itemName = "event-type";

export default createReducer(itemName);
export {
  getAllItems as getEventTypes,
  getItemById as getEventTypeById
} from "../../utilities/reducer";
