import {
   SET_ID,
   SET_NAME,
   SET_COLORS,
   SET_TYPE,
   SET_RARITY,
} from "../constants";

const hashParams = new URLSearchParams(window.location.search);

const initialState = {
   id: hashParams.get("id") || "",
   name: hashParams.get("name") || "",
   colors: hashParams.get("colors") ? hashParams.get("colors").split(",") : "",
   type: hashParams.get("type") || "",
   rarity: hashParams.get("rarity") || "",
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
