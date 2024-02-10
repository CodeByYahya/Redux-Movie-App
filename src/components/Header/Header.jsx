import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import user from "./../../images/user.png";

function Header() {
  return (
    <div className="header">
      <Link to="/" className="logo">
        Movie App
      </Link>
      <div className="user-image">
        <img src={user} alt="user" />
      </div>
    </div>
  );
}

export default Header;
