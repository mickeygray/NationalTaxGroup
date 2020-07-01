import React, { useContext, useEffect } from "react";
import ReminderItem from "./ReminderItem";
import UserContext from "../../context/user/userContext";
import LeadContext from "../../context/lead/leadContext";
import AuthContext from "../../context/auth/authContext";

const Reminders = () => {
  const userContext = useContext(UserContext);
  const leadContext = useContext(LeadContext);
  const authContext = useContext(AuthContext);
  const { lead } = leadContext;
  const { getUser } = userContext;
  const { user } = authContext;

  useEffect(() => {
    getUser();
  }, []);

  console.log(user);
  //
  return (
    <>
      <div style={leadStyle}>
        <div className='bg-white' style={{ height: "5rem" }}>
          <h2 className='text-danger all-center'> My Reminders</h2>
        </div>
        {user
          ? user.reminders.map((reminder) => (
              <ReminderItem key={reminder.id} reminder={reminder} />
            ))
          : ""}
      </div>
    </>
  );
};
const leadStyle = {
  display: "grid",
  gridTemplateRows: "repeat(10, 1fr)",
};

export default Reminders;
