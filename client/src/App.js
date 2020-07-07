import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import StatState from "./context/stat/StatState";
import CallState from "./context/call/CallState";
import UserState from "./context/user/UserState";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import ShipEm from "./components/pages/app/ShipEm";
import Stacks from "./components/pages/app/Stacks";
import Popkis from "./components/pages/app/Popkis";
import Eyore from "./components/pages/app/Eyore";
import DangerZone from "./components/pages/app/DangerZone";
import LeadState from "./context/lead/LeadState";
import EmailState from "./context/email/EmailState";
import TakeMeOffTheList from "./components/pages/splash/TakeMeOffTheList";
import FreshStart from "./components/pages/splash/FreshStart";
import TaxGroup from "./components/pages/website/pages/TaxGroup";
import FileAComplaint from "./components/pages/splash/FileAComplaint";
import LienViewer from "./components/pages/website/pages/LienViewer";
import IGetYourMoneyBack from "./components/pages/website/pages/IGetYourMoneyBack";
import Free1040Filler from "./components/pages/website/pages/Free1040Filler";
import PPsPalace from "./components/pages/app/PPsPalace";
const App = () => {
  return (
    <AuthState>
      <UserState>
        <LeadState>
          <EmailState>
            <CallState>
              <StatState>
                <AlertState>
                  <Router>
                    <Fragment>
                      <Switch>
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/login' component={Login} />

                        <PrivateRoute
                          exact
                          path='/prospects/:id'
                          component={Popkis}
                        />
                        <PrivateRoute exact path='/stacks' component={Stacks} />
                        <PrivateRoute exact path='/' component={DangerZone} />
                        <PrivateRoute exact path='/eyore' component={Eyore} />
                        <PrivateRoute exact path='/shipem' component={ShipEm} />
                        <PrivateRoute
                          exact
                          path='/PPsPalace'
                          component={PPsPalace}
                        />
                      </Switch>
                    </Fragment>
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
              </StatState>
            </CallState>
          </EmailState>
        </LeadState>
      </UserState>
    </AuthState>
  );
};

export default App;
