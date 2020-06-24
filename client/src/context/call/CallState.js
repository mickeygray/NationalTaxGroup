import React, { useReducer } from "react";
import axios from "axios";
import CallContext from "./callContext";
import CallReducer from "./callReducer";
import {
  GET_CALLS,
  SEND_CALL,
  FILTER_CALLS,
  CLEAR_FILTER,
  GET_LEADCALLS,
  GET_NUMBS,
} from "../types";

let callRailKey;

if (process.env.NODE_ENV !== "production") {
  callRailKey = process.env.REACT_APP_CALL_RAIL_KEY;
} else {
  callRailKey = process.env.REACT_APP_CALL_RAIL_KEY;
}

const CallState = (props) => {
  const initialState = {
    calls: [],
    call: {},
    filtered: null,
    thing: null,
    leadCalls: [],
  };

  const [state, dispatch] = useReducer(CallReducer, initialState);

  const getCalls = async () => {
    const config = {
      headers: {
        "Authorization": `Token token=6c0dbe4e525e0bff243007882b40eb2b`,
      },
    };
    const res = await axios.get(
      `https://api.callrail.com/v3/a/423787543/calls.json?fields=answered,first_call,formatted_customer_name,duration,recording_player,start_time,total_calls,source_name,formatted_customer_phone_number,customer_city,customer_name,customer_phone_number,customer_state,start_time,id,tracking_phone_number`,
      config
    );

    dispatch({
      type: GET_CALLS,
      payload: res.data.calls,
    });
  };

  const getLeadCalls = async (number) => {
    const config = {
      headers: {
        "Authorization": `Token token=6c0dbe4e525e0bff243007882b40eb2b`,
      },
    };
    const res = await axios.get(
      `https://api.callrail.com/v3/a/423787543/calls.json?search=${number}&&fields=formatted_duration,recording_player,total_calls,formatted_customer_phone_number,created_at,id`,
      config
    );

    const leadCalls = res.data.calls;

    dispatch({
      type: GET_LEADCALLS,
      payload: leadCalls,
    });

    console.log(leadCalls);
  };

  const setNumber = (phone, phone2, phone3) => {
    let number;

    if (phone) {
      number = phone;
    } else if (phone2) {
      number = phone2;
    } else if (phone3) {
      number = phone3;
    }

    console.log(number);

    getLeadCalls(number);
  };

  const sendCall = async (call) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/prospects/calls", call, config);
    dispatch({
      type: SEND_CALL,
      payload: res.data,
    });
  };
  //Filter Calls
  const filterCalls = (text) => {
    dispatch({ type: FILTER_CALLS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <CallContext.Provider
      value={{
        calls: state.calls,
        call: state.call,
        filtered: state.filtered,
        leadCalls: state.leadCalls,
        getCalls,
        sendCall,
        filterCalls,
        clearFilter,
        getLeadCalls,
        setNumber,
      }}>
      {props.children}
    </CallContext.Provider>
  );
};

export default CallState;
