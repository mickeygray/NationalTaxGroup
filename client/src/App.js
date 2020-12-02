import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import StatState from "./context/stat/StatState";
import CallState from "./context/call/CallState";
import UserState from "./context/user/UserState";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";



import LeadState from "./context/lead/LeadState";
import EmailState from "./context/email/EmailState";
import MailState from "./context/mail/MailState";
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
