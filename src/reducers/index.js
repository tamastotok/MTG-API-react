import { combineReducers } from "redux";
import colorsReducer from "./colors";
import colorsCheckBoxReducer from "./colorsCheckBox";
import typeReducer from "./type";
import rarityReducer from "./rarity";
import pageReducer from "./page";
import cardNameReducer from "./cardName";
import isClickedReducer from "./isClicked";
import statusMessageReducer from "./statusMessage";

const allReducers = combineReducers({
   colors: colorsReducer,
   colorsCheckBox: colorsCheckBoxReducer,
   type: typeReducer,
   rarity: rarityReducer,
   page: pageReducer,
   cardName: cardNameReducer,
   isClicked: isClickedReducer,
   statusMessage: statusMessageReducer,
});

export default allReducers;
