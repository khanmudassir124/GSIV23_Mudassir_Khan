import { createSlice } from "@reduxjs/toolkit";
import { MovieCollection } from "../../types/MovieCollection";

export interface movieListState {
  data: MovieCollection;
}
const INITIAL_STATE = {
  data: {
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
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
