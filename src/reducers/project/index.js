import { createReducer } from "../../utilities/reducer";

const itemName = "project";

export default createReducer(itemName, "slug");
export {
  getAllItems as getProjects,
  getItemById as getProjectBySlug
} from "../../utilities/reducer";
