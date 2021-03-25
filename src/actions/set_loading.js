import { SET_IS_LOADING } from "../constants";

export const setIsLoading = (boolean) => {
   return {
      type: SET_IS_LOADING,
      payload: boolean,
   };
};
