import "./App.css";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing.jsx";
import Register from "./components/auth/Register.jsx";
import Testbed from "./components/testbed/Testbed.jsx";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/testbed' component={Testbed} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
