import { SET_CHECKBOX } from "../constants";

const hashParams = new URLSearchParams(window.location.search);

const initialState = hashParams.get("checkbox")
   ? hashParams.get("checkbox").split(",")
   : [];

const checkboxReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_CHECKBOX:
         if (state.includes(action.payload)) {
            return state.filter((r) => r !== action.payload);
         } else {
            return [...state, action.payload].sort();
         }
      default:
         return state;
   }
};
export default checkboxReducer;
