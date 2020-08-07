import React, { useContext, useEffect, Fragment, useState } from "react";
import AuthContext from "../../../context/auth/authContext";
import UserContext from "../../../context/user/userContext";
import LeadContext from "../../../context/lead/leadContext";
import Reminders from "../../dangerzone/Reminders";
import MyLeads from "../../dangerzone/MyLeads";
import MyMoney from "../../dangerzone/MyMoney";

import Tasks from "../../dangerzone/Tasks";
import Navbar from "../../layout/Navbar";

const DangerZone = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);

  const { getMyProspects, myProspects } = userContext;
  const { user } = authContext;

  return (
    <Fragment>
      <Fragment>
        <Navbar />
      </Fragment>
      <div>
        <h1 className='text-danger'>Danger Zone!</h1>
        <div className='grid-3'>
          <div
            className='sidebar'
            style={{ marginLeft: "150px", width: "15rem" }}>
            <Reminders user={user} />
          </div>

          <div>
            <h3 className='text-danger'>My Prospects And Clients</h3>
            <div>
              <MyLeads user={user} />
            </div>
            <div>
              <MyMoney />
            </div>
          </div>
          <div className='sidebar' style={{ width: "15rem" }}>
            <Tasks user={user} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DangerZone;
