import React from "react";
import { Link } from "react-router-dom";

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
            <div className='buttons centered'>
              <Link to='/login' className='btn btn-light btn-landing btn-left'>
                <span>Staff</span>
              </Link>
              <Link
                to='/student'
                className='btn btn-light btn-landing btn-right'
              >
                <span>Student</span>
              </Link>
            </div>
            <div className='buttons centered'>
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
