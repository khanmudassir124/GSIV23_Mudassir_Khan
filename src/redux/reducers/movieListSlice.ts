import { createSlice } from "@reduxjs/toolkit";

export interface movieListState {
  data: any;
}
const INITIAL_STATE = {
  data: false,
};

export const movieListSlice = createSlice({
  name: "movieslist",
  initialState: INITIAL_STATE,
  reducers: {
    setMoviesList: (state, action) => {
      state.data = action?.payload;
    },
  },
});

export const { setMoviesList } = movieListSlice.actions;

export default movieListSlice.reducer;
