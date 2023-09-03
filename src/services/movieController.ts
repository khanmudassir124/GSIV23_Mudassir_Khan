import axios from "axios";
import { MovieCollection } from "../types/MovieCollection";
import { MovieDetail } from "../types/MovieDetail";
import { axiosInstance } from "./axiosInstance";
import { MovieDetailOMDB } from "../types/MovieDetailOMDB";

const fetchLatestMovies = (pageNumber = 1) => {
  return axiosInstance
    .get(
      `discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=primary_release_date.desc`
    )
    .then((result) => result.data)
    .then((result: MovieCollection) => {
      console.log("RESULT:", result);
      return result;
    })
    .catch((error) => {
      console.error("ERROR WHILE REFRESH:", error);
      return null;
    });
};

const searchMovies = (query: string) => {
  // https://api.themoviedb.org/3/search/movie?query=Pathan&include_adult=true&language=en-US&page=1
  return axiosInstance
    .get(`search/movie?query=${query}&include_adult=true&language=en-US&page=1`)
    .then((result) => result.data)
    .then((result: MovieCollection) => {
      console.log("SEARCH RESULT:", result);
      return result;
    })
    .catch((error) => {
      console.error("ERROR WHILE SEARCH:", error);
      return null;
    });
};

const getMovieDetails = (movieId: string) => {
  return axiosInstance
    .get(`movie/${movieId}?language=en-US`)
    .then((result) => result.data)
    .then((result: MovieDetail) => {
      console.log("MOVIE DETAIL RESULT:", result);
      return result;
    })
    .catch((error) => {
      console.error("ERROR WHILE MOVIE DETAIL FETCH:", error);
      return null;
    });
};

const getOMDBMovieDetails = (imdb_Id: string) => {
  return axios
    .get(
      `http://www.omdbapi.com/?i=${imdb_Id}&apikey=${process.env.REACT_APP_OMDB_AUTH_TOKEN}
      `
    )
    .then((result) => result.data)
    .then((result: MovieDetailOMDB) => {
      console.log("OMDB MOVIE DETAIL RESULT:", result);
      return result;
    })
    .catch((error) => {
      console.error("ERROR WHILE OMDB MOVIE DETAIL FETCH:", error);
      return null;
    });
};

const MovieController = {
  fetchLatestMovies,
  searchMovies,
  getMovieDetails,
  getOMDBMovieDetails
};

export default MovieController;
