import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/layout/Dashboard";
import CreateTimeTable from "./components/timetable/CreateTimeTable";
import ShareTimeTable from "./components/layout/ShareTimeTable";
import AboutUs from "./components/layout/AboutUs";
import Landing from "./components/layout/Landing";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedin: false };
    this.logout = this.logout.bind(this);
    axios.get("/loggedin").then(res => {
      if (res.status === 200 && res.data.name) {
        this.setState({ isLoggedin: true });
      }
    });
  }

  logout() {
    this.setState({ isLoggedin: false });
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
        <Provider store={store}>
          <BrowserRouter>
            <Navbar action={this.logout} />
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/create" component={CreateTimeTable} />
            <Route path="/share" component={ShareTimeTable} />
            <Route path="/aboutUs" component={AboutUs} />
          </BrowserRouter>
        </Provider>
      );
    }
  }
}

export default App;
