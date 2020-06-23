import React, { useContext } from "react";
import LeadContext from "../../../context/lead/leadContext";
import { Link } from "react-router-dom";
import UserContext from "../../../context/user/userContext";
import AuthContext from "../../../context/auth/authContext";

const ReminderItem = ({
  reminder: { clientId, clientName, reminderText, id, reminderDate },
}) => {
  const reminder = { clientId, clientName, reminderText, id };
  const { user } = useContext(AuthContext);
  const { getLead } = useContext(LeadContext);
  const { deleteReminder } = useContext(UserContext);

  let dateDisplay = new Date(reminderDate);
  let formattedReminderDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(dateDisplay);

  return (
    <div className='card'>
      <Link
        to={`/leads/${clientId}`}
        onClick={() => getLead(clientId)}
        className='btn btn-dark btn-sm'
        style={{ width: "10rem" }}>
        {clientName}
      </Link>{" "}
      <span style={{ float: "right", height: "1rem", fontSize: ".7rem" }}>
        <button onClick={() => deleteReminder(user, reminder)}>X</button>
      </span>
      <p style={{ backgroundColor: "white" }}>
        {formattedReminderDate}
        <br />
        {reminderText}
      </p>
    </div>
  );
};

export default ReminderItem;
