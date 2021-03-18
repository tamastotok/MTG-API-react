import { SELECT_TYPE } from "../constants";

export const selectType = (type) => {
   return {
      type: SELECT_TYPE,
      payload: type,
   };
};
