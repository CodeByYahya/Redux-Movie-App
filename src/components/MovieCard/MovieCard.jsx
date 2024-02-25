import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./MovieCard.scss";
import AOS from "aos";
import "aos/dist/aos.css";

function MovieCard(props) {
  const { data } = props;
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="card-item" data-aos="zoom-in">
      <Link to={`/movie/${data.imdbID}`}>
        <div className="card-inner">
          <div className="card-top">
            <img src={data.Poster} alt={data.Title} />
          </div>
          <div className="card-bottom">
            <div className="card-info">
              <h4>{data.Title}</h4>
              <p>{data.Year}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
