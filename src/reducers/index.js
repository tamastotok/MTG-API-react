import { combineReducers } from "redux";
import cardsReducer from "./cards-reducer";
import checkboxReducer from "./checkbox-reducer";
import pageReducer from "./page-reducer";
import isLoadingReducer from "./set-loading";
import statusReducer from "./set-status";

const reducers = combineReducers({
   cards: cardsReducer,
   checkbox: checkboxReducer,
   page: pageReducer,
   isLoading: isLoadingReducer,
   status: statusReducer,
});

export default reducers;
