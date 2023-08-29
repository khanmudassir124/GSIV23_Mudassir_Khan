import { useSelector } from "react-redux";
import { ApplicationState } from "../redux/store";

const useMovieList = () => {
  const movieList = useSelector((state: ApplicationState) => state?.movieList);
  return movieList;
};

export default useMovieList;
