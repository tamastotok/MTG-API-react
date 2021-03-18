import { SELECT_RARITY } from "../constants";

export const selectRarity = (rarity) => {
   return {
      type: SELECT_RARITY,
      payload: rarity,
   };
};
