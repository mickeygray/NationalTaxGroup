import React, { useContext } from "react";
import CallContext from "../../../context/call/callContext";
import LeadContext from "../../../context/lead/leadContext";

const LeadCallItem = ({
  leadCall: {
    formatted_duration,
    recording_player,
    created_at,
    total_calls,
    formatted_customer_phone_number,
    id,
  },
}) => {
  let callTime = new Date(created_at);

  let formattedCallTime = Intl.DateTimeFormat(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(callTime);

  return (
    <div className='card bg-light'>
      <p>{formatted_customer_phone_number}</p>
      <p>{formattedCallTime} </p>
      <p>Length of Call: {formatted_duration}</p>
      <a
        href={recording_player}
        target='_blank'
        className='btn-dark btn-sm btn'>
        Listen to Call
      </a>
    </div>
  );
};

export default LeadCallItem;
