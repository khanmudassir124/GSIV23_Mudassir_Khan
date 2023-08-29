import {
  combineReducers,
  configureStore,
  createAction,
} from "@reduxjs/toolkit";
import { UiSlice, uiState } from "./reducers/uiSlice";
import { movieListSlice } from "./reducers/movieListSlice";
import { MovieCollection } from "../types/MovieCollection";

export const revertAll = createAction("REVERT_ALL");
export interface ApplicationState {
  ui: uiState;
  movieList: MovieCollection;
}

const combinedReducer = combineReducers({
  ui: UiSlice.reducer,
  movieList: movieListSlice.reducer,
});

const rootReducer = (state:any, action:any) => {
  if (action.type === "REVERT_ALL") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
