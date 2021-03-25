import { SET_CHECKBOX } from "../constants";

export const setCheckbox = (index) => {
   return {
      type: SET_CHECKBOX,
      payload: index,
   };
};
