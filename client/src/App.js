import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";



import LeadState from "./context/lead/LeadState";

import TakeMeOffTheList from "./components/pages/splash/TakeMeOffTheList";
import FreshStart from "./components/pages/splash/FreshStart";
import TaxGroup from "./components/pages/website/pages/TaxGroup";

import LienViewer from "./components/pages/website/pages/LienViewer";

const App = () => {
  return (
          <LeadState>
                    <Router>
                      <Fragment>
                        <Switch>
                          <Route exact path='/taxgroup' component={TaxGroup} />
                          <Route
                            exact
                            path='/freshstart'
                            component={FreshStart}
                          />
                          <Route
                            exact
                            path='/lienviewer'
                            component={LienViewer}
                          />
                          <Route
                            exact
                            path='/takemeoffthelist'
                            component={TakeMeOffTheList}
                          />
                        </Switch>
                      </Fragment>
                    </Router>
          </LeadState>

  );
};

export default App;
