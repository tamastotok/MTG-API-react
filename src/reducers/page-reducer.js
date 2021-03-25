import { INCREMENT_PAGE_NUMBER, RESET_PAGE_NUMBER } from "../constants";

const pageReducer = (state = 1, action) => {
   switch (action.type) {
      case INCREMENT_PAGE_NUMBER:
         return state + 1;
      case RESET_PAGE_NUMBER:
         return 1;
      default:
         return state;
   }
};

export default pageReducer;
