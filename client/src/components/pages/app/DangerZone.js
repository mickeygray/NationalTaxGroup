import React, { useContext, useEffect, Fragment } from "react";
import AuthContext from "../../../context/auth/authContext";
import UserContext from "../../../context/user/userContext";
import LeadContext from "../../../context/lead/leadContext";
import Reminders from "../../dangerzone/Reminders";
import MyLeads from "../../dangerzone/MyLeads";
import Calls from "../../calls/Calls";
import CallFilter from "../../calls/CallFilter";
import Tasks from "../../dangerzone/Tasks";
import Navbar from "../../layout/Navbar";
const DangerZone = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const leadContext = useContext(LeadContext);

  const { updateUser, getMyLeads, getUser } = userContext;
  const { user } = authContext;
  console.log(user);

  useEffect(() => {
    if (user != null) {
      getUser(user._id);
    }
  }, []);
  return (
    <Fragment>
      <Fragment>
        <Navbar />
      </Fragment>
      <div className='container' style={{ height: "100vh" }}>
        <h1 className='text-danger'>Danger Zone!</h1>
        <div className='grid-3'>
          <div className='sidebar' style={{ width: "15rem" }}>
            <Reminders user={user} />
          </div>
          <div className='sidebar' style={{ width: "15rem" }}>
            <Tasks user={user} />
          </div>

          <Fragment>
            <MyLeads user={user} />
          </Fragment>
          <div className='sidebar' style={{ width: "15rem" }}>
            <h5>Popkis Match</h5>
            <CallFilter user={user} />
            <Calls user={user} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DangerZone;
