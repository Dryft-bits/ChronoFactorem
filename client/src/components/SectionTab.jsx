import React, { Component } from "react";
import ListSection from "./ListSection";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
class SectionTabs extends Component {
  componentDidMount() {
    M.Tabs.init(this.Tabs);
  }

  render() {
    return (
      <>
        <ul
          ref={Tabs => {
            this.Tabs = Tabs;
          }}
          id="tabs-swipe-demo"
          className="tabs"
        >
          <li className="tab col s3">
            <a href="#Lecture">Lecture</a>
          </li>
          <li className="tab col s3">
            <a href="#Tutorial">Tutorial</a>
          </li>
          <li className="tab col s3">
            <a href="#Practical">Practical</a>
          </li>
        </ul>

        <div id="Lecture" className="col s12">
          <ListSection
            action={this.props.action}
            sections={this.props.getSections("L")}
          />
        </div>
        <div id="Tutorial" className="col s12">
          <ListSection
            action={this.props.action}
            sections={this.props.getSections("T")}
          />
        </div>
        <div id="Practical" className="col s12">
          <ListSection
            action={this.props.action}
            sections={this.props.getSections("P")}
          />
        </div>
      </>
    );
  }
}

export default SectionTabs;
