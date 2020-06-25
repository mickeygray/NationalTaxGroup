import React, { useContext } from "react";
import CallContext from "../../context/call/callContext";
import LeadContext from "../../context/lead/leadContext";

const CallItem = ({
  call: {
    answered,
    first_call,
    formatted_customer_name,
    total_calls,
    source_name,
    formatted_customer_phone_number,
    customer_city,
    customer_name,
    customer_phone_number,
    customer_state,
    start_time,
    id,
    tracking_phone_number,
  },
}) => {
  const callid = id;
  const call = {
    answered,
    first_call,
    formatted_customer_name,
    total_calls,
    source_name,
    formatted_customer_phone_number,
    customer_city,
    customer_name,
    customer_phone_number,
    customer_state,
    start_time,
    callid,
    tracking_phone_number,
  };
  const { letCall } = useContext(LeadContext);
  const { sendCall } = useContext(CallContext);
  const number = formatted_customer_phone_number;
  const onClick = (e) => {
    sendCall(call);
    letCall(number);
  };

  return (
    <div className='card' style={{ width: "250px" }}>
      <h5>{answered ? `Answered` : "Incoming Call..."} </h5>
      <h5>
        {first_call ? `First Time Caller` : `Total Calls: ${total_calls}`}{" "}
      </h5>
      <ul>
        <li>
          <strong className='text-danger'>{formatted_customer_name}</strong>
        </li>
        <li>
          {customer_city},{customer_state}
        </li>
        <li>{formatted_customer_phone_number}</li>
      </ul>

      <div>
        <button className='btn btn-dark btn-sm' onClick={onClick}>
          {" "}
          My Call{" "}
        </button>
      </div>
    </div>
  );
};

export default CallItem;
