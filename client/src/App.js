import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Testbed from "./components/testbed/Testbed.jsx";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Fragment>
        <section className='container'>
          <Switch>
            <Route exact path='/testbed' component={Testbed} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
