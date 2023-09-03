import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Body from "../components/Body";
import MovieController from "../services/movieController";
import { MovieDetail } from "../types/MovieDetail";
import { MovieDetailOMDB } from "../types/MovieDetailOMDB";
import { Ring } from "@uiball/loaders";
interface MovieDetailProps {}

const MovieDetailScreen: React.FC<MovieDetailProps> = ({}) => {
  const params = useParams();
  const [movie, setMovie] = useState<MovieDetailOMDB | null>(null);

  useEffect(() => {
    console.log("MovieDetail:", params?.id);
    if (params?.id) {
      MovieController.getMovieDetails(params?.id).then((result) => {
        if (result && result?.imdb_id) {
          MovieController.getOMDBMovieDetails(result?.imdb_id).then((r) => {
            setMovie(r);
          });
        }
      });
    }
  }, [params?.id]);
  return (
    <div>
      <Header
        header_Component={<h3 className="font-semibold">Movie Details</h3>}
      />
      <Body>
        {movie ? (
          <div className="w-full h-full flex flex-col md:flex-row ">
            <img
              src={movie?.Poster}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
              }}
              className="w-full h-auto md:w-[250px] md:h-[350px]  border-2 border-[#aeaeae] bg-[#DFDFDF]"
            />
            <div className="flex-1 px-5 flex flex-col text-[#4A4A4A]">
              <h3 className="text-xl font-semibold my-2">
                {movie?.Title}{" "}
                <span className="text-[#aeaeae] font-normal">
                  ({movie?.imdbRating})
                </span>
              </h3>
              <div className="">
                {movie?.Year} | {movie?.Runtime} | {movie?.Director}
              </div>
              <div className="">Cast : {movie?.Actors}</div>
              <div className="my-2">Description : {movie?.Plot}</div>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center p-5">
            <Ring size={40} lineWeight={5} speed={2} color="black" />
          </div>
        )}
      </Body>
    </div>
  );
};

export default MovieDetailScreen;
