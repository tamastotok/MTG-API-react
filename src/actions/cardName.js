import { CHANGE_CARDNAME } from "../constants";

export const setCardName = (cardName) => {
   return {
      type: CHANGE_CARDNAME,
      payload: cardName,
   };
};
