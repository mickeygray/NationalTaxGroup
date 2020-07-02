import React, { useContext, useEffect } from "react";
import LeadCallItem from "./LeadCallItem";
import CallContext from "../../context/call/callContext";
import LeadContext from "../../context/lead/leadContext";

const LeadCalls = () => {
  const callContext = useContext(CallContext);
  const { prospect } = useContext(LeadContext);
  const { leadCalls, setNumber } = callContext;
  const { phone, phone2, phone3 } = prospect;

  return (
    <>
      <button
        className='btn-danger btn-sm btn py-3 my-1'
        onClick={() => setNumber(phone)}>
        Primary
      </button>
      <button
        className='btn-danger btn-sm btn py-3 my-1'
        onClick={() => setNumber(phone2)}>
        Secondary
      </button>
      <button
        className='btn-danger btn-sm btn py-3 my-1'
        onClick={() => setNumber(phone3)}>
        Tertiary
      </button>
      <h5>Select a Number to List Calls</h5>
      {leadCalls.map((leadCall) => (
        <LeadCallItem key={leadCall.id} leadCall={leadCall} />
      ))}
    </>
  );
};

export default LeadCalls;
