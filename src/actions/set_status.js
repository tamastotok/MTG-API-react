import { SET_STATUS } from "../constants";

export const setStatus = (string) => {
   return {
      type: SET_STATUS,
      payload: string,
   };
};
