import { MovieCollection } from "../types/MovieCollection";
import { axiosInstance } from "./axiosInstance";


const fetchLatestMovies = (pageNumber=1) => {
    axiosInstance
      .get(
        `discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=primary_release_date.desc`
      )
      .then((result) => result.data)
      .then((result: MovieCollection) => {
        console.log("RESULT:", result);
      })
      .catch((error) => {
        console.error("ERROR WHILE REFRESH:", error);
      });
  };



const MovieController = {
  fetchLatestMovies
};

export default MovieController;
