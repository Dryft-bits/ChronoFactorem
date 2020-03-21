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
import HelForm from "./components/layout/HelForm";
import PrivateRoute from "./components/routes/PrivateRoute";
import SemiPrivateRoute from "./components/routes/SemiPrivateRoute";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedin: false };
    this.logout = this.logout.bind(this);
    axios.get("/api/loggedin").then(res => {
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
            <Route exact path='/' component={Landing} />
            <SemiPrivateRoute exact path='/helform' component={HelForm} />
            <PrivateRoute exact path='/Dashboard' component={Dashboard} />
            <PrivateRoute exact path='/create' component={CreateTimeTable} />
            <PrivateRoute exact path='/share' component={ShareTimeTable} />
            <PrivateRoute exact path='/aboutUs' component={AboutUs} />
          </BrowserRouter>
        </Provider>
      );
    }
  }
}

export default App;
