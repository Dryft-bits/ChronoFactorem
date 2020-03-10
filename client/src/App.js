import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/layout/Dashboard";
import CreateTimeTable from "./components/timetable/CreateTimeTable";
import ShareTimeTable from "./components/layout/ShareTimeTable";
import AboutUs from "./components/layout/AboutUs";
import Landing from "./components/layout/Landing";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentTab: "Create TimeTable", isLoggedin: false };
    this.changeTab = this.changeTab.bind(this);
    axios.get("/loggedin").then(res => {
      console.log(res);
      if (res.status === 200 && res.data.name) {
        this.setState({ isLoggedin: true });
      }
    });
  }

  userLoggedIn() {
    axios.get("/loggedin").then(res => {
      console.log(res);
      if (res.status === 200 && res.data.name) {
        this.setState({ isLoggedin: true });
      }
    });
  }

  toggleLoggedin() {
    this.setState({ ...this.state, isLoggedin: false });
  }

  changeTab(input) {
    console.log(input.target.text);
    let selectedTab = input.target.text;
    if (input.target.text === "Logout" && this.state.isLoggedin) {
      this.setState({
        currentTab: selectedTab,
        isLoggedin: false
      });
    } else {
      this.setState({
        currentTab: selectedTab
      });
    }
  }
  render() {
    if (!this.state.isLoggedin) {
      return (
        <div>
          <Landing></Landing>
        </div>
      );
    } else {
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
            ) : this.state.currentTab === "Logout" ? (
              <Landing></Landing>
            ) : (
              <h1 align='center'>"Page not available"</h1>
            )}
          </div>
        </div>
      );
    }
  }
}

export default App;
