import React, { Component } from "react";
import PropTypes from "prop-types";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import ListSection from "./ListSection";

class SectionTabs extends Component {
  componentDidMount() {
    M.Tabs.init(this.Tabs);
  }

  render() {
    return (
      <>
        <div className='col s12'>
          <ul
            ref={Tabs => {
              this.Tabs = Tabs;
            }}
            className='tabs'
          >
            <li className='tab col s6'>
              <a href='#Lecture'>Lecture</a>
            </li>
            <li className='tab col s6'>
              <a href='#Tutorial'>Tutorial</a>
            </li>
            <li className='tab col s6'>
              <a href='#Practical'>Practical</a>
            </li>
          </ul>
        </div>
        <div id='Lecture' className='col s12'>
          <ListSection sections={this.props.getSections("L")} />
        </div>
        <div id='Tutorial' className='col s12'>
          <ListSection sections={this.props.getSections("T")} />
        </div>
        <div id='Practical' className='col s12'>
          <ListSection sections={this.props.getSections("P")} />
        </div>
      </>
    );
  }
}

SectionTabs.propTypes = {
  getSections: PropTypes.func.isRequired
};

export default SectionTabs;
