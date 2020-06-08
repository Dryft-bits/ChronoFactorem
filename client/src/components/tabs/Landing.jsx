import React from "react";
import "../../styles/Landing.css";
import configuration from "../../config/constants.js";
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
            <div>
              <a href={configuration.urls.adminLogin}>
                <button className='btn-landing btn-left'>
                  <span>Admin </span>
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
      <div>
      </div>
    </section>
  );
};


export default Landing;
