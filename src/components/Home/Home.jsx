import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  // const movieText = "Harry";
  // const showText = "friends";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const movieText = params.get("q") || "Harry";
    const showText = "friends";

    dispatch(fetchAsyncMovies(movieText));
    dispatch(fetchAsyncShows(showText));
  }, [dispatch]);

  return (
    <div>
      <div className="banner-img">
        <MovieListing />
      </div>
    </div>
  );
}

export default Home;
