import React from "react";
import MovieController from "../services/movieController";
interface MovieListProps {}
const MovieList: React.FC<MovieListProps> = ({}) => {
  MovieController.fetchLatestMovies();
  return <div>MovieList</div>;
};

export default MovieList;
