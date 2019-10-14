import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ icon, title }) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={icon}></i>
        {title}
      </h1>
      <ul>
        <li>
          <Link to="/">
            <i class="fas fa-home"></i> Home
          </Link>
        </li>
        <li>
          <Link to="/about">
            <i className="fas fa-question-circle"></i> About
          </Link>
        </li>
      </ul>
    </nav>
  );
};
Navbar.defaultProps = {
  title: " Navigation Bar",
  icon: "fab fa-adn"
};
// eslint-disable-next-line react/no-typos
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
