import { PAGE_NUMBER_INCREMENT, PAGE_NUMBER_RESET } from "../constants";

export const setPage = () => {
   return {
      type: PAGE_NUMBER_INCREMENT,
   };
};

export const setPageReset = () => {
   return {
      type: PAGE_NUMBER_RESET,
   };
};
