import {
   SET_ID,
   SET_NAME,
   SET_COLORS,
   SET_TYPE,
   SET_RARITY,
} from "../constants";

export const setId = (id) => {
   return {
      type: SET_ID,
      payload: id,
   };
};

export const setName = (name) => {
   return {
      type: SET_NAME,
      payload: name,
   };
};

export const setColors = (color) => {
   return {
      type: SET_COLORS,
      payload: color,
   };
};

export const setType = (type) => {
   return {
      type: SET_TYPE,
      payload: type,
   };
};

export const setRarity = (rarity) => {
   return {
      type: SET_RARITY,
      payload: rarity,
   };
};
