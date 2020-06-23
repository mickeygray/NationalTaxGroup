import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/app/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";
import AuthState from "./context/auth/AuthState";
import "./App.css";
import AlertState from "./context/alert/AlertState";
import CallState from "./context/call/CallState";
import UserState from "./context/user/UserState";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import ShipEm from "./components/ntenet/pages/ShipEm";
import Stacks from "./components/ntenet/pages/Stacks";
import Popkis from "./components/ntenet/pages/Popkis";
import DangerZone from "./components/ntenet/pages/DangerZone";
import LeadState from "./context/lead/LeadState";
import EmailState from "./context/email/EmailState";
import TakeMeOffTheList from "./components/pages/splash/TakeMeOffTheList";
import FreshStart from "./components/pages/splash/FreshStart";
import TaxGroup from "./components/pages/website/pages/TaxGroup";
import FileAComplaint from "./components/pages/splash/FileAComplaint";
import LienViewer from "./components/pages/website/pages/LienViewer";
import IGetYourMoneyBack from "./components/pages/website/pages/IGetYourMoneyBack";
import Free1040Filler from "./components/pages/website/pages/Free1040Filler";
const App = () => {
  return (
    <AuthState>
      <UserState>
        <LeadState>
          <EmailState>
            <CallState>
              <AlertState>
                <Router>
                  <Fragment>
                    <Navbar />

                    <Switch>
                      <PrivateRoute exact path='/' component={Home} />
                      <Route exact path='/register' component={Register} />
                      <Route exact path='/login' component={Login} />
                      <Route exact path='/freshstart' component={FreshStart} />
                      <Route exact path='/lienviewer' component={LienViewer} />
                      <Route exact path='/taxgroup' component={TaxGroup} />
                      <PrivateRoute
                        exact
                        path='/prospects/:id'
                        component={Popkis}
                      />
                      <PrivateRoute exact path='/stacks' component={Stacks} />
                      <PrivateRoute
                        exact
                        path='/dangerzone'
                        component={DangerZone}
                      />
                      <PrivateRoute exact path='/shipem' component={ShipEm} />
                      <Route
                        exact
                        path='/free1040filler'
                        component={Free1040Filler}
                      />
                      <Route
                        exact
                        path='/igetyourmoneyback'
                        component={IGetYourMoneyBack}
                      />
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
              </AlertState>
            </CallState>
          </EmailState>
        </LeadState>
      </UserState>
    </AuthState>
  );
};

export default App;
