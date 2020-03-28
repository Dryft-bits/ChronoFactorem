import React from "react";
import "../../styles/Landing.css";
import configuration from "../../config/constants.js";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/checkloggedin'></Redirect>;
  }

  return (
    <section className='landing body'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <div className='main'>
            <h1 className='text-x-large text-landing'>ChronoFactorem</h1>
            <p className='text-large text-landing description center'>
              Create your own timetable.
            </p>
            <div>
              <a href='/login'>
                <button className='btn-landing btn-left'>
                  <span>Staff </span>
                </button>
              </a>
              <a href={configuration.urls.googleAuth}>
                <button className='btn-landing btn-right'>
                  <span>Student </span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps, null)(Landing);
