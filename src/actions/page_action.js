import { INCREMENT_PAGE_NUMBER, RESET_PAGE_NUMBER } from "../constants";

export const incrementPage = () => {
   return {
      type: INCREMENT_PAGE_NUMBER,
   };
};

export const resetPage = () => {
   return {
      type: RESET_PAGE_NUMBER,
   };
};
