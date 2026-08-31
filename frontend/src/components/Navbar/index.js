import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../actions/authAction";
import "./style.css";

function Navbar(props) {
  function toggleNav() {
    animateSlider();
    const burgerButton = document.getElementById("burger");
    burgerButton.classList.toggle("is-active");
  }

  function animateSlider() {
    const slider = document.getElementsByClassName("slider")[0];
    if(document.getElementById("root").style.overflow === "hidden") {
      document.getElementById("root").style.overflow = "auto";
    } else {
      document.getElementById("root").style.overflow = "hidden";
    }
    slider.classList.toggle("active");

    const list = document.getElementsByClassName("list")[0];
    list.childNodes.forEach((e, index) => {
      if (e.style.animation) e.style.animation = "";
      else
        e.style.animation = `listItemFade 0.5s ease forwards ${
          index / 5 + 0.3
        }s`;
    });
  }

  const renderLinks = (isMobile) => (
    <>
      <Link onClick={isMobile ? toggleNav : null} to="/movies" className="nav-link">
        Home
      </Link>
      {props.user && props.user.role === "admin" && (
        <>
          <Link onClick={isMobile ? toggleNav : null} to="/movies/new" className="nav-link">
            Add Movie
          </Link>
          <Link onClick={isMobile ? toggleNav : null} to="/genres/new" className="nav-link">
            Add Genre
          </Link>
        </>
      )}
      {!props.loggedIn ? (
        <>
          <Link onClick={isMobile ? toggleNav : null} to="/login" className="nav-link">
            Login
          </Link>
          <Link onClick={isMobile ? toggleNav : null} to="/register" className="nav-link">
            Register
          </Link>
        </>
      ) : (
        <Link
          onClick={() => {
            if (isMobile) toggleNav();
            props.signOut();
          }}
          to="/#"
          className="nav-link"
        >
          Log out
        </Link>
      )}
    </>
  );

  return (
    <nav className="nav-wrapper">
      <div className="nav-brand-container">
        <Link className="nav-brand" to="/">TheatreHub</Link>
      </div>

      {/* Desktop Navigation */}
      <div className="desktop-nav">
        {renderLinks(false)}
      </div>

      {/* Mobile Hamburger Button */}
      <div id="burger" className="ico-btn mobile-only" onClick={toggleNav}>
        <span className="ico-btn__burger"></span>
      </div>

      {/* Mobile Slider Menu */}
      <div id="slider" className="slider mobile-only">
        <ul className="list">
          {renderLinks(true)}
        </ul>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
