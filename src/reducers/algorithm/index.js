import { createReducer } from "../../utilities/reducer";

const itemName = "algorithm";

export default createReducer(itemName, "slug");
export {
  getAllItems as getAlgorithms,
  getItemById as getAlgorithmBySlug
} from "../../utilities/reducer";
