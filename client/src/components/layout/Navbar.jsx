import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Navbar.css";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser() {
    if (
      !window.confirm("All your unsaved progress will be lost once you logout!")
    ) {
      return;
    }
    this.props.action();
    this.props.logout();
  }

  render() {
    if (!this.props.isAuthenticated) {
      return null;
    } else if (
      (!this.props.submitted &&
        this.props.user &&
        this.props.user.submittedForm) ||
      this.props.submitted
    ) {
      return (
        <div>
          <nav className='nav-wraper blue'>
            <div className='container'>
              <NavLink to='/' className='brand-logo left'>
                ChronoFactorem
              </NavLink>
              <ul className='right hide-on-med-and-down'>
                <li>
                  <NavLink to='/Dashboard'>Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to='/create'>Create TimeTable</NavLink>
                </li>
                <li>
                  <NavLink to='/share'>Share TimeTable</NavLink>
                </li>
                <li>
                  <NavLink to='/aboutUs'>About Us</NavLink>
                </li>
                <li>
                  <NavLink to='/' onClick={this.logoutUser}>
                    Logout{" "}
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
          <nav className='nav-wraper blue'>
            <div className='container'>
              <NavLink to='/' className='brand-logo left'>
                ChronoFactorem
              </NavLink>
              <ul className='right hide-on-med-and-down'>
                <li>
                  <NavLink to='/' onClick={this.logoutUser}>
                    Logout{" "}
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      );
    }
  }
}

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

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
