import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const logInStatus = useSelector((state) => state.auth.logged_in);
  const user = useSelector((state) => state.auth.user);


  let logInContent;
  let logOutContent;
  let registerContent;

  if(logInStatus){
    logInContent = (
      <li className="nav-item">
        <div className="nav-link">
          Welcome{" "}
          <span style={{ color: "red" }}>
            {user.username}
          </span>
          !
        </div>
      </li>
    );
    logOutContent = (
      <li className="nav-item">
        <Link to="/logout" className="nav-link">
          Logout
        </Link>
      </li>
    );
  }else{
    logInContent = (
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
    );
    registerContent = (
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
    );
  }
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <a className="navbar-brand" href="/">
        Social Media Clone
      </a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Posts
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav">
          {logInContent}
          {registerContent}
          {logOutContent}
        </ul>
      </div>
    </nav>
  );
};
