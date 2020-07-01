import React, { useContext, useEffect, useState } from "react";
import LeadContext from "../../context/lead/leadContext";
import { Link } from "react-router-dom";
import UserContext from "../../context/user/userContext";
import userContext from "../../context/user/userContext";

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
    _id,
  },
}) => {
  const leadContext = useContext(LeadContext);
  const userContext = useContext(UserContext);
  const { getProspect, getProspectName, fullName } = leadContext;
  const { deleteReminder, getUserName, name } = userContext;
  const reminder = {
    text,
    _id,
    userReminded,
    reminderDate,
    reminderDueDate,
    status,
    daysTilDue,
    clientId,
    id,
  };
  useEffect(() => {
    getProspectName(clientId);
    getUserName(_id);
  }, []);

  useEffect(() => {
    if (name != null) {
      setAssignedBy(name);
    }
  }, [name, userContext]);

  useEffect(() => {
    if (fullName != null) {
      setFullName(fullName);
    }
  }, [fullName, leadContext]);

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
  }, [daysTilDue]);

  const [clientName, setFullName] = useState("");

  const [assignedBy, setAssignedBy] = useState({
    date: "",
    email: "",
    leads: [],
    name: "",
    password: "",
    prevLeads: [],
    reminders: [],
    tasks: [],
  });
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
        {clientName ? clientName : ""}
      </Link>{" "}
      <span style={{ float: "right", height: "1rem", fontSize: ".7rem" }}>
        <button onClick={() => deleteReminder(user, reminder)}>X</button>
      </span>
      <p>Assigned By : {assignedBy.name ? assignedBy.name : ""}</p>
      <p>Due On : {formattedReminderDueDate}</p>
      <p>Status : {status}</p>
      <p>Notes: {text}</p>
    </div>
  );
};

export default ReminderItem;
