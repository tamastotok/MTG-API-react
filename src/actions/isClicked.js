import { SET_IS_CLICKED } from "../constants";

export const setIsClicked = (bool) => {
   return {
      type: SET_IS_CLICKED,
      payload: bool,
   };
};
