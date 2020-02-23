import React from "react";
import "../../styles/Navbar.css";
const Navbar = props => {
  return (
    <div>
      <nav className='nav-wraper blue'>
        <div className='container'>
          <a href='#' className='brand-logo left'>
            ChronoFactorem
          </a>
          <ul className='right hide-on-med-and-down' onClick={props.action}>
            <li>
              <a href='#'>Dashboard</a>
            </li>
            <li>
              <a href='#'>Create TimeTable</a>
            </li>
            <li>
              <a href='#'>Share TimeTable</a>
            </li>
            <li>
              <a href='#'>About Us</a>
            </li>
            <li>
              <a href='#'>Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
