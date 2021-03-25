import { SET_IS_LOADING } from "../constants";

const isLoadingReducer = (state = false, action) => {
   switch (action.type) {
      case SET_IS_LOADING:
         return action.payload;
      default:
         return state;
   }
};

export default isLoadingReducer;
