import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Landing.css";

export const Landing = () => {
  return (
    <section className='landing body'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <div className='main'>
            <h1 className='text-x-large text-landing'>ChronoFactorem</h1>
            <p className='text-large text-landing description center'>
              Create your own timetable.
            </p>
            <div className='buttons'>
              <Link to='/login' className='btn btn-light btn-landing btn-left'>
                <span>Staff</span>
              </Link>
              <a href='http://localhost:5000/api/auth/google'>
                <button className='btn btn-light btn-landing btn-right btn-ref'>
                  <span>Student </span>
                </button>
              </a>
            </div>
            <div className='buttons'>
              <Link to='/testbed' className='btn btn-testbed'>
                Testbed
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
