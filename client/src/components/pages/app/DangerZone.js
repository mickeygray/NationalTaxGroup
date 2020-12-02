import React, {
  useContext,
  useEffect,
  Fragment,
  useState,
  useCallback,
} from "react";
import AuthContext from "../../../context/auth/authContext";
import UserContext from "../../../context/user/userContext";
import LeadContext from "../../../context/lead/leadContext";
import StatContext from "../../../context/stat/statContext";
import Reminders from "../../dangerzone/Reminders";
import MyLeads from "../../dangerzone/MyLeads";
import MyMoney from "../../dangerzone/MyMoney";

import Tasks from "../../dangerzone/Tasks";
import Navbar from "../../layout/Navbar";

const DangerZone = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const statContext = useContext(StatContext);

  const { getPeriodPay, getUser } = userContext;
  const { setPeriod } = statContext;

  const { user } = authContext;

  const [updateView, setUpdateView] = useState(0);

  const updateState = useCallback(() => {
    setUpdateView((updateView) => ++updateView);
  }, []);

  useEffect(()=>{
    setPeriod()
  },[])

  return (
    <Fragment>
      <Fragment>
        <Navbar />
      </Fragment>
      <div>
        <span style={{ display: "none" }}>{updateView}</span>
        <h1 className='text-danger'>Danger Zone!</h1>
        <div className='grid-3'>
          <div
            className='sidebar'
            style={{ marginLeft: "150px", width: "15rem" }}>
            <Reminders updateState={updateState} user={user} />
          </div>

          <div>
            <h3 className='text-danger'>My Prospects And Clients</h3>

            <MyLeads user={user} />
          </div>
          <div className='sidebar' style={{ width: "15rem" }}>
            <Tasks updateState={updateState} user={user} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DangerZone;
