import { combineReducers } from "redux"
import colorsReducer from "./colors"
import typeReducer from "./type"
import rarityReducer from "./rarity"
import pageReducer from "./page"
import searchPageReducer from "./searchPage"
import cardNameReducer from "./cardName"
import filterReducer from "./filterClicked"
import searchReducer from "./searchClicked"
import cardNameCheckBoxReducer from "./cardNameCheckBox"
import colorsCheckBoxReducer from "./colorsCheckBox"

const allReducers = combineReducers({
     cardName: cardNameReducer,
     colors: colorsReducer,
     filterButton: filterReducer,
     page: pageReducer,
     searchPage: searchPageReducer,
     rarity: rarityReducer,
     searchButton: searchReducer,
     type: typeReducer,
     cardNameCheckBox: cardNameCheckBoxReducer,
     colorsCheckBox: colorsCheckBoxReducer
})

export default allReducers;