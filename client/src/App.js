import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/app/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";
import AuthState from "./context/auth/AuthState";
import "./App.css";
import LeadState from "./context/lead/LeadState";
import EmailState from "./context/email/EmailState";
import TakeMeOffTheList from "./components/pages/splash/TakeMeOffTheList";
import FreshStart from "./components/pages/splash/FreshStart";
import TaxGroup from "./components/pages/website/TaxGroup/pages/TaxGroup";
import FileAComplaint from "./components/pages/splash/FileAComplaint";

const App = () => {
  return (
    <AuthState>
      <LeadState>
        <EmailState>
          <Router>
            <Fragment>
              <Navbar />

              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/freshstart' component={FreshStart} />
                <Route exact path='/taxgroup' component={TaxGroup} />
                <Route
                  exact
                  path='/fileacomplaint'
                  component={FileAComplaint}
                />
                <Route
                  exact
                  path='/takemeoffthelist'
                  component={TakeMeOffTheList}
                />
              </Switch>
            </Fragment>
          </Router>
        </EmailState>
      </LeadState>
    </AuthState>
  );
};

export default App;
