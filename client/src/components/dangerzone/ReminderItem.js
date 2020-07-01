import React, { useContext, useEffect, useState } from "react";
import LeadContext from "../../context/lead/leadContext";
import { Link } from "react-router-dom";
import UserContext from "../../context/user/userContext";

const ReminderItem = ({
  reminder: {
    text,
    user,
    userReminded,
    reminderDate,
    reminderDueDate,
    status,
    daysTilDue,
    clientId,
    id,
  },
}) => {
  const reminder = {
    text,
    user,
    userReminded,
    reminderDate,
    reminderDueDate,
    status,
    daysTilDue,
    clientId,
    id,
  };

  useEffect(() => {
    if (daysTilDue > 6) {
      setColorStyle({
        backgroundColor: "green",
        color: "white",
      });
    } else if (daysTilDue < 6 && daysTilDue > 3) {
      setColorStyle({
        backgroundColor: "yellow",
        color: "black",
      });
    } else if (daysTilDue < 3) {
      setColorStyle({
        backgroundColor: "red",
        color: "yellow",
      });
    }
  });

  const { getProspect, getProspectName } = useContext(LeadContext);
  const { deleteReminder, getUserName } = useContext(UserContext);

  const prospect = getProspectName(clientId);

  const { fullName } = prospect;

  const assignedBy = getUserName(user);

  let reminderDateDisplay = new Date(reminderDate);
  let formattedReminderDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(reminderDateDisplay);

  let reminderDueDateDisplay = new Date(reminderDueDate);
  let formattedReminderDueDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(reminderDueDateDisplay);

  const [colorStyle, setColorStyle] = useState({
    backgroundColor: "green",
    color: "white",
  });

  return (
    <div className='card' style={colorStyle}>
      <Link
        to={`/prospects/${clientId}`}
        onClick={() => getProspect(clientId)}
        className='btn btn-dark btn-sm'
        style={{ width: "10rem" }}>
        {fullName}
      </Link>{" "}
      <span style={{ float: "right", height: "1rem", fontSize: ".7rem" }}>
        <button onClick={() => deleteReminder(user, reminder)}>X</button>
      </span>
      <ul>
        <li> Assigned By : {assignedBy}</li>
        <li> Date Assigned: {formattedReminderDate}</li>
        <li> Date Due: {formattedReminderDueDate}</li>
      </ul>
      <p>{text}</p>
    </div>
  );
};

export default ReminderItem;
