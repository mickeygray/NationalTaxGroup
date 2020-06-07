import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";
import AuthState from "./context/auth/AuthState";
import "./App.css";
import LeadState from "./context/lead/LeadState";
import EmailState from "./context/email/EmailState";

const App = () => {
  return (
    <AuthState>
      <LeadState>
        <EmailState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </EmailState>
      </LeadState>
    </AuthState>
  );
};

export default App;
