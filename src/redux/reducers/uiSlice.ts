import { createSlice } from "@reduxjs/toolkit";

export interface uiState {
  isLoading: boolean;
}
const INITIAL_STATE = {
  isLoading: false
};

export const UiSlice = createSlice({
  name: "ui",
  initialState: INITIAL_STATE,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action?.payload;
    },
  },
});

export const {
  setIsLoading,
} = UiSlice.actions;

export default UiSlice.reducer;
