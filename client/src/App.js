import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import store from "./store";
import { loadUser } from "./actions/auth";
import "./styles/App.css";

import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/layout/Dashboard";
import CreateTimeTable from "./components/timetable/CreateTimeTable";
import ShareTimeTable from "./components/layout/ShareTimeTable";
import AboutUs from "./components/layout/AboutUs";
import Landing from "./components/layout/Landing";
import HelForm from "./components/layout/HelForm";
import PrivateRoute from "./components/routes/PrivateRoute";
import SemiPrivateRoute from "./components/routes/SemiPrivateRoute";
import CheckLoggedIn from "./components/layout/CheckLoggedIn";

const App = () => {
  // Restore user information on refresh
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <Route exact path='/checkloggedin' component={CheckLoggedIn} />
        <SemiPrivateRoute exact path='/helform' component={HelForm} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create' component={CreateTimeTable} />
        <PrivateRoute exact path='/share' component={ShareTimeTable} />
        <PrivateRoute exact path='/aboutUs' component={AboutUs} />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
