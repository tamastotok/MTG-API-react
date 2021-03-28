import {
   SET_ID,
   SET_NAME,
   SET_COLORS,
   SET_TYPE,
   SET_RARITY,
} from "../constants";
import { DEFAULT_COLORS, DEFAULT_TYPES, DEFAULT_RARITIES } from "../data";

const hashParams = new URLSearchParams(window.location.search);

// Error handling
const checkNameFromUrl = () => {
   if (hashParams.get("name") && hashParams.get("name").length > 2) {
      return hashParams.get("name");
   } else {
      return "";
   }
};

const checkColorsFromUrl = () => {
   if (hashParams.get("colors")) {
      const hashParamsArray = hashParams.get("colors").split(",");
      let colors = [];
      for (let i = 0; i < hashParamsArray.length; i++) {
         if (DEFAULT_COLORS.includes(hashParamsArray[i])) {
            colors.push(hashParamsArray[i]);
         }
      }
      return colors;
   } else {
      return "";
   }
};

const checkTypeFromUrl = () => {
   if (DEFAULT_TYPES.includes(hashParams.get("type"))) {
      return hashParams.get("type");
   } else {
      return "";
   }
};

const checkRarityFromUrl = () => {
   if (DEFAULT_RARITIES.includes(hashParams.get("rarity"))) {
      return hashParams.get("rarity");
   } else {
      return "";
   }
};
//-----

const initialState = {
   id: hashParams.get("id") || "",
   name: checkNameFromUrl(),
   colors: checkColorsFromUrl(),
   type: checkTypeFromUrl(),
   rarity: checkRarityFromUrl(),
};

export default function cardsReducer(state = initialState, action) {
   switch (action.type) {
      case SET_ID:
         return {
            ...state,
            id: action.payload,
         };

      case SET_NAME:
         return {
            ...state,
            name: action.payload,
         };

      case SET_COLORS:
         if (state.colors.includes(action.payload)) {
            return {
               ...state,
               colors: state.colors.filter((item) => item !== action.payload),
            };
         } else {
            return {
               ...state,
               colors: [...state.colors, action.payload].sort(),
            };
         }

      case SET_TYPE:
         return {
            ...state,
            type: action.payload,
         };

      case SET_RARITY:
         return {
            ...state,
            rarity: action.payload,
         };

      default:
         return state;
   }
}
