import {
    combineReducers,
    configureStore,
    createAction,
  } from "@reduxjs/toolkit";
import { UiSlice, uiState } from "./reducers/uiSlice";
 
  
  export const revertAll = createAction("REVERT_ALL");
  export interface ApplicationState {
    ui: uiState;
  }
  
  const combinedReducer = combineReducers({
    ui: UiSlice.reducer,
  });
  
  const rootReducer = (state, action) => {
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
  