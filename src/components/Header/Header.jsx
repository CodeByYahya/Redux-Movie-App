import React, { useState, useEffect } from "react";
import "./Header.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import user from "./../../images/user.png";
import { useDispatch } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";

function Header() {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchTerm = params.get("q");
    if (searchTerm) {
      setTerm(decodeURIComponent(searchTerm));
      setTerm(" ");
    }
  }, [location]);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/?q=${encodeURIComponent(term)}`); // Update URL with search term
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));
    setTerm(" ");
  };

  const handleLogoClick = () => {
    // Redirect to homepage and set default search term
    setTerm("");
    dispatch(fetchAsyncMovies("Harry"));
    dispatch(fetchAsyncShows("friends"));
  };
  return (
    <div className="header">
      <Link to="/" className="logo" onClick={handleLogoClick}>
        Movie App
      </Link>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={term}
            placeholder="Search Movies or Shows"
            onChange={(e) => setTerm(e.target.value)}
          />
          <button>
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      <div className="user-image">
        <img src={user} alt="user" />
      </div>
    </div>
  );
}

export default Header;
