import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import store from "./store";
import { loadUser } from "./actions/auth";
import "./styles/App.css";
import HELData from "./components/tabs/HELData";
import Navbar from "./components/utils/Navbar";
import Dashboard from "./components/tabs/Dashboard";
import CreateTimeTable from "./components/timetable/CreateTimeTable";
import AboutUs from "./components/tabs/AboutUs";
import Landing from "./components/tabs/Landing";
import HelForm from "./components/forms/HelForm";
import PrivateRoute from "./components/routes/PrivateRoute";
import SemiPrivateRoute from "./components/routes/SemiPrivateRoute";
import CheckLoggedIn from "./components/authorization/CheckLoggedIn";

import createBrowserHistory from "./history";

export const history = createBrowserHistory({ forceRefresh: true });

const App = () => {
  // Restore user information on refresh
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <Route exact path='/checkloggedin' component={CheckLoggedIn} />
        <SemiPrivateRoute exact path='/helform' component={HelForm} />
        <PrivateRoute exact path='/Dashboard' component={Dashboard} />
        <PrivateRoute exact path='/helData' component={HELData} />
        <PrivateRoute exact path='/create' component={CreateTimeTable} />
        
        <PrivateRoute exact path='/aboutUs' component={AboutUs} />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
