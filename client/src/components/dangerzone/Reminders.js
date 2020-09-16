import React, { useContext, useEffect } from "react";
import ReminderItem from "./ReminderItem";
import UserContext from "../../context/user/userContext";
import LeadContext from "../../context/lead/leadContext";
import AuthContext from "../../context/auth/authContext";

const Reminders = (props) => {
  const userContext = useContext(UserContext);
  const leadContext = useContext(LeadContext);
  const authContext = useContext(AuthContext);
  const { lead, getLeadName } = leadContext;
  const { getUser, getUserName } = userContext;
  const { user } = authContext;

  useEffect(() => {
    if (user != null) {
      getUser(user._id);
    }
  }, []);

  console.log(user);
  //
  return (
    <>
      <div style={leadStyle}>
        <div
          className='bg-white'
          style={{ overflowY: "scroll", height: "100vh" }}>
          <h2 className='text-danger all-center'> My Reminders</h2>

          {user
            ? user.reminders.map((reminder) => (
                <ReminderItem
                  updateState={props.updateState}
                  key={reminder.id}
                  reminder={reminder}
                />
              ))
            : ""}
        </div>
      </div>
    </>
  );
};
const leadStyle = {
  display: "grid",
  gridTemplateRows: "repeat(10, 1fr)",
};

export default Reminders;
