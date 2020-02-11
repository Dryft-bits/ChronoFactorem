import React from "react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <section className='landing'>
      <div className='landing-inner'>
        <h1 className='x-large'>ChronoFactorem</h1>
        <p className='reg'>Create your own timetable.</p>
        <div className='buttons'>
          <Link to='/student' className='btn btn-dark'>
            I am a student
          </Link>
          <Link to='/register' className='btn btn-dark'>
            I am a staff member
          </Link>
          <Link to='/testbed' className='btn btn-dark'>
            Testbed
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing;
