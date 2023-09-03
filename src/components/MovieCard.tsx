import React, { cloneElement, useEffect, useRef, useState } from "react";
import { MovieMeta } from "../types/MovieCollection";
import { axiosInstance } from "../services/axiosInstance";
import axios from "axios";
import useToken from "../hooks/useToken";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  key: string;
  movie: MovieMeta;
}

const MAX_WORDS_PER_LINE = 4;

const MovieCard: React.FC<MovieCardProps> = ({ key, movie }) => {
  const navigate = useNavigate();
  const calculateNumberOfLines = (text: string | null) => {
    if (!text) return 0;
    const words = text.split(" ");
    const lines = Math.ceil(words.length / MAX_WORDS_PER_LINE);
    return lines;
  };

  const overview = movie.overview || "No overview available";

  const numberOfLines = calculateNumberOfLines(overview);
  const truncatedOverview = overview
    .split(" ")
    .slice(0, MAX_WORDS_PER_LINE)
    .join(" ");

  return (
    <div
      key={key}
      className=" mx-auto shadow-lg  rounded-xl flex flex-col justify-start items-center h-72  w-80 sm:w-full hover:scale-105 focus:scale-105 transition duration-100 ease-in-out cursor-pointer "
      onClick={() => {
        console.log("CLICKING:", movie?.id);
        navigate(`${movie?.id}`);
      }}
    >
      <img
        src={"https://image.tmdb.org/t/p/original" + movie?.poster_path}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src =
            "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
        }}
        className="w-full rounded-t-xl h-52  border-0 outline-0 bg-[#DFDFDF]"
      />
      <div className="w-full flex flex-row items-center text-sm p-1">
        <h5 className="font-semibold w-9/12">{movie?.title}</h5>
        <h6 className="w-3/12 text-[#9B9B9B]">({movie.vote_average})</h6>
      </div>
      <div className="px-1 text-[#4A4A4A] text-sm w-full">
        {truncatedOverview}{" "}
        {numberOfLines > 1 ? `... (${numberOfLines} Lines)` : ""}
      </div>
    </div>
  );
};

export default MovieCard;
