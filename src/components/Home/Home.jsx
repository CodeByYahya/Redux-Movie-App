import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
import { APIKEY } from "../../common/api/movieApi";
import movieApi from "../../common/api/MovieApiKey";
import { useDispatch } from "react-redux";
import { addMovies } from "../../features/movies/movieSlice";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch movies when component mounts

    const fetchMovies = async () => {
      const movieSearchText = "harry";

      try {
        const response = await movieApi.get(
          `?apikey=${APIKEY}&s=${movieSearchText}`
        );
        dispatch(addMovies(response.data));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <div className="banner-img">
        <MovieListing />
      </div>
    </div>
  );
}

export default Home;
