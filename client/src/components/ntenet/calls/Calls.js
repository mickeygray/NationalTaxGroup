import React, { useContext } from "react";
import CallItem from "./CallItem";
import CallContext from "../../../context/call/callContext";
import useRecursiveTimeout from "../../../utils/useRecursiveTimeout";

const Calls = () => {
  const callContext = useContext(CallContext);

  const { calls, getCalls, filtered } = callContext;

  useRecursiveTimeout(async () => {
    await getCalls(calls);
  }, 7000);

  return (
    <div className='sidebar'>
      {filtered !== null
        ? filtered.map((call) => <CallItem key={call.id} call={call} />)
        : calls.map((call) => <CallItem key={call.id} call={call} />)}
    </div>
  );
};

export default Calls;
