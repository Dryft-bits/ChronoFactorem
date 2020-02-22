import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/layout/Dashboard";
import CreateTimeTable from "./components/timetable/CreateTimeTable";
import ShareTimeTable from "./components/timetable/ShareTimeTable";
import AboutUs from "./components/layout/AboutUs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentTab: "Dashboard" };
    this.changeTab = this.changeTab.bind(this);
  }
  changeTab(input) {
    console.log(input.target.text);
    let selectedTab = input.target.text;
    this.setState({
      currentTab: selectedTab
    });
  }
  render() {
    return (
      <div>
        <Navbar action={this.changeTab} />
        <div>
          {this.state.currentTab === "Dashboard" ? (
            <Dashboard />
          ) : this.state.currentTab === "Create TimeTable" ? (
            <CreateTimeTable />
          ) : this.state.currentTab === "Share TimeTable" ? (
            <ShareTimeTable />
          ) : this.state.currentTab === "About Us" ? (
            <AboutUs />
          ) : (
            <h1 align='center'>"Page not available"</h1>
          )}
        </div>
      </div>
    );
  }
}

export default App;
