import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing.jsx";
import StudentLayout from "./components/layout/StudentLayout.jsx";
import Testbed from "./components/testbed/Testbed.jsx";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Switch>
            <Route exact path='/student' component={StudentLayout} />
            <Route exact path='/testbed' component={Testbed} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
