import React, { useEffect, useState, useRef } from "react";
import MovieController from "../services/movieController";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MovieCard from "../components/MovieCard";
import useMovieList from "../hooks/useMovieList";
import { useDispatch } from "react-redux";
import { setMoviesList } from "../redux/reducers/movieListSlice";
import { unionBy } from "lodash";
import { Ring } from "@uiball/loaders";
import Header from "../components/Header";
import Body from "../components/Body";
import { MovieCollection } from "../types/MovieCollection";

interface MovieListProps {}
const MovieList: React.FC<MovieListProps> = ({}) => {
  const dispatch = useDispatch();
  const movieList = useMovieList();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  console.log("Movies:", movieList);
  const [filteredMovies, setFilteredMovies] = useState<MovieCollection | null>(
    null
  );

  const handleFetchMovieList = (pgNumber = 1) => {
    if (searchInput?.length > 3) return;
    setLoading(true);
    MovieController.fetchLatestMovies(pgNumber).then((result) => {
      if (result) {
        const updatedResults =
          movieList?.results?.length === 0
            ? result?.results
            : unionBy(movieList?.results, result?.results, "id");
        const updatedMovieList = {
          ...result,
          results: updatedResults,
        };
        dispatch(setMoviesList(updatedMovieList));
      }
      setLoading(false);
    });
  };

  const handleSearchResult = () => {
    setLoading(true);
    MovieController.searchMovies(searchInput).then((result) => {
      if (result) {
        setFilteredMovies(result);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    handleFetchMovieList();
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && movieList?.page) {
          handleFetchMovieList(movieList?.page + 1);
        }
      },
      { threshold: 1 }
    );
    if (observerRef.current) {
      observerRef.current.observe(
        document.querySelector("#scrollTrigger") as Element
      );
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [movieList.page]);

  useEffect(() => {
    if (searchInput.length > 3) {
      handleSearchResult();
    }
  }, [searchInput]);

  // const filteredMovies =
  //   searchInput.length > 3
  //     ? movieList.results?.filter((movie) =>
  //         movie?.title?.toLowerCase().includes(searchInput.toLowerCase())
  //       )
  //     : movieList.results;
  const list = searchInput.length > 3 ? filteredMovies : movieList;
  return (
    <>
      <Header
        header_Component={
          <div className="relative w-7/12">
            <div className="absolute inset-y-0 left-0 flex items-center pl-1.5 pointer-events-none">
              <SearchOutlinedIcon className="text-[#9B9B9B]" />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border-none rounded-lg focus-visible:outline-none bg-[#DFDFDF] focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        }
      />
      <Body>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-4">
          {!loading && list?.results?.length === 0 ? (
            <div className="w-full flex justify-center items-center p-5 text-xl">
              Not Result Found
            </div>
          ) : (
            list?.results?.map((movie, index) => (
              <MovieCard key={`movie_${index}`} movie={movie} />
            ))
          )}
        </div>
        {loading ? (
          <div className="w-full flex justify-center items-center p-5">
            <Ring size={40} lineWeight={5} speed={2} color="black" />
          </div>
        ) : (
          <></>
        )}
        <div id="scrollTrigger" className="h-1"></div>
      </Body>
    </>
  );
};

export default MovieList;
