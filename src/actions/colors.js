import { SELECT_COLOR, RESET_COLOR } from "../constants";

export const selectColors = (color) => {
   return {
      type: SELECT_COLOR,
      payload: color,
   };
};

export const resetColors = () => {
   return {
      type: RESET_COLOR,
   };
};
