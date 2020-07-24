import React, { useContext, useEffect, useState } from "react";
import LeadContext from "../../context/lead/leadContext";
import { Link } from "react-router-dom";
import UserContext from "../../context/user/userContext";
import Moment from "react-moment";

import AuthContext from "../../context/auth/authContext";

const TaskItem = ({
  task: {
    clientName,
    clientId,
    id,
    assignedDate,
    updatedDate,
    assigned,
    assignment,
  },
}) => {
  const leadContext = useContext(LeadContext);
  const userContext = useContext(UserContext);

  const { user } = useContext(AuthContext);
  const { deleteTask } = userContext;
  const { getProspect } = leadContext;

  console.log(assigned);
  const duration = parseInt(<Moment fromNow></Moment>);

  useEffect(() => {
    if (duration < 3) {
      setColorStyle({
        backgroundColor: "red",
        color: "white",
      });
    } else if (duration > 3 && duration < 6) {
      setColorStyle({
        backgroundColor: "yellow",
        color: "black",
      });
    } else if (duration > 6) {
      setColorStyle({
        backgroundColor: "red",
        color: "yellow",
      });
    }
  }, [duration]);
  let reminderDateDisplay = new Date(assignedDate);
  let formattedReminderDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(reminderDateDisplay);

  const [colorStyle, setColorStyle] = useState({
    backgroundColor: "green",
    color: "white",
  });

  return (
    <div className='card' style={colorStyle}>
      Assigned <Moment fromNow>{assignedDate}</Moment>
      <Link
        to={`/prospects/${clientId}`}
        onClick={() => getProspect(clientId)}
        className='btn btn-dark btn-sm'
        style={{ width: "10rem" }}>
        {clientName ? clientName : ""}
      </Link>{" "}
      <span style={{ float: "right", height: "1rem", fontSize: ".7rem" }}>
        <button onClick={() => deleteTask(user, id)}>X</button>
      </span>
      <p>Document Required: {assignment}</p>
      <p>Assigned On : {formattedReminderDate}</p>
    </div>
  );
};

export default TaskItem;
