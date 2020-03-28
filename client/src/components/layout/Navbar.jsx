import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/Navbar.css';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const Navbar = ({ submitted, user, isAuthenticated, logout }) => {
  if (!isAuthenticated) {
    return null;
  } else if ((!submitted && user && user.submittedForm) || submitted) {
    return (
      <div>
        <nav className="nav-wraper blue">
          <div className="container">
            <NavLink to="/" className="brand-logo left">
              ChronoFactorem
            </NavLink>
            <ul className="right hide-on-med-and-down">
              <li>
                <NavLink to="/Dashboard">Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/HELDATA">HELData</NavLink>
              </li>
              <li>
                <NavLink to="/create">Create TimeTable</NavLink>
              </li>
              <li>
                <NavLink to="/share">Share TimeTable</NavLink>
              </li>
              <li>
                <NavLink to="/aboutUs">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/" onClick={logout}>
                  Logout{' '}
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div>
        <nav className="nav-wraper blue">
          <div className="container">
            <NavLink to="/" className="brand-logo left">
              ChronoFactorem
            </NavLink>
            <ul className="right hide-on-med-and-down">
              <li>
                <NavLink to="/" onClick={logout}>
                  Logout{' '}
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    submitted: state.helForm.submitted,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps, { logout })(Navbar);
