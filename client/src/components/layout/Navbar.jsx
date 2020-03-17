import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../../styles/Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    if (
      !window.confirm(
        "All your unsaved Progress will be lost,once you Logout!Are you sure you want to continue?"
      )
    ) {
      return;
    }
    axios.get("/api/logout").then(res => {
      this.props.action();
    });
  }

  render() {
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
                <NavLink to="/create">Create TimeTable</NavLink>
              </li>
              <li>
                <NavLink to="/share">Share TimeTable</NavLink>
              </li>
              <li>
                <NavLink to="/aboutUs">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/" onClick={this.logout}>
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

export default Navbar;
