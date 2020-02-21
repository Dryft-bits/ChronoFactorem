import React from 'react';
import "../styles/Navbar.css";
const Navbar = (props) => {
    return ( <div>
        <nav className="nav-wraper indigo">
            <div className="container">
            <option className="brand-logo">Site Title</option>
            <ul className="right hide-on-med-and-down" onClick={props.action}>
                <option className="waves-effect waves-light btn">Dashboard</option>
                <option className="waves-effect waves-light btn">Create TimeTable</option>
                <option className="waves-effect waves-light btn">Share TimeTable</option>
                <option className="waves-effect waves-light btn">About Us</option>
            </ul>
            </div>
        </nav>
    </div> );
}
 
export default Navbar;