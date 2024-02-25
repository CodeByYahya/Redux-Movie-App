import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./MovieDetail.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  fetchAsyncMovieOrShowDetail,
  getAllSelectedMoviesOrShow,
  removeSelectedMovieOrShow,
} from "../../features/movies/movieSlice";
import Loader from "../Loader/Loader";

function MovieDetail() {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getAllSelectedMoviesOrShow);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  useEffect(() => {
    dispatch(fetchAsyncMovieOrShowDetail(imdbID));
    return () => {
      dispatch(removeSelectedMovieOrShow());
    };
  }, [dispatch, imdbID]);

  return (
    <div className="movie-section">
      {Object.keys(data).length === 0 ? (
        <Loader />
      ) : (
        <>
          <div data-aos="zoom-in" className="section-left ">
            <div className="movie-title">{data.Title}</div>
            <div className="movie-rating">
              <span>
                IMDB Rating <i class="fa fa-star"></i> : {data.imdbRating}
              </span>
              <span>
                IMDB Votes <i class="fa fa-thumbs-up"></i> : {data.imdbVotes}
              </span>
              <span>
                Runtime <i class="fa fa-film"></i> : {data.Runtime}
              </span>
              <span>
                Year <i class="fa fa-calendar"></i> : {data.Year}
              </span>
            </div>
            <div className="movie-plot">{data.Plot}</div>
            <div className="movie-info">
              <div>
                <span>Director</span>
                <span>{data.Director}</span>
              </div>
              <div>
                <span>Stars</span>
                <span>{data.Actors}</span>
              </div>
              <div>
                <span>Genre</span>
                <span>{data.Genre}</span>
              </div>
              <div>
                <span>Languages</span>
                <span>{data.Language}</span>
              </div>
              <div>
                <span>Awards</span>
                <span>{data.Awards}</span>
              </div>
            </div>
          </div>
          <div className="section-right">
            <img data-aos="zoom-in" src={data.Poster} alt={data.Title} />
          </div>
        </>
      )}
    </div>
  );
}

export default MovieDetail;
