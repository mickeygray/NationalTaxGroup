import React, { useContext, useEffect, Fragment } from "react";
import AuthContext from "../../../context/auth/authContext";
import UserContext from "../../../context/user/userContext";
import LeadContext from "../../../context/lead/leadContext";
import Reminders from "../../dangerzone/Reminders";
import MyLeads from "../../dangerzone/MyLeads";
import Calls from "../../calls/Calls";
import CallFilter from "../../calls/CallFilter";

const DangerZone = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const leadContext = useContext(LeadContext);

  const { updateUser, getMyLeads } = userContext;
  const { user } = authContext;
  console.log(user);
  return (
    <div className='container'>
      <h1 className='text-danger'>Danger Zone!</h1>
      <div className='grid-3'>
        <div className='sidebar' style={{ width: "15rem" }}>
          <Reminders />
        </div>

        <Fragment>
          <MyLeads />
        </Fragment>
        <div className='sidebar' style={{ width: "15rem" }}>
          <h5>Popkis Match</h5>
          <CallFilter />
          <Calls />
        </div>
      </div>
    </div>
  );
};

export default DangerZone;
