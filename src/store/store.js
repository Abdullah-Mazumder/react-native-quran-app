import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { fullSurahReducer } from "./reducers/fullSurahReducer";
import { nobleQuranReducer } from "./reducers/nobleQuranReducer";
import { shortSurahListReducer } from "./reducers/shortSurahListReducer";

const rootReducer = combineReducers({
  shortSurahList: shortSurahListReducer,
  fullSurah: fullSurahReducer,
  nobleQuran: nobleQuranReducer,
});
const middlewares = [thunk];

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares))
);

export default store;
