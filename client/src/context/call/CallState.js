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
  GET_EMAILCALLS,
  GET_CAMPAIGNCALLS,
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
    currentCalls: null,
    emailCalls: null,
    campaignCalls: null,
  };

  const [state, dispatch] = useReducer(CallReducer, initialState);

  const getCalls = async () => {
    const config = {
      headers: {
        "Authorization": `Token token=0308353ef587c7e0a52edb0383355f0a`,
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
        "Authorization": `Token token=0308353ef587c7e0a52edb0383355f0a`,
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

  const getEmailCalls = async (currentEmail) => {
    const config = {
      headers: {
        "Authorization": `Token token=0308353ef587c7e0a52edb0383355f0a`,
      },
    };

    const { trackingNumber } = currentEmail;
    const res = await axios.get(
      `https://api.callrail.com/v3/a/423787543/calls.json?search=${trackingNumber}&&fields=formatted_duration,recording_player,total_calls,formatted_customer_phone_number,created_at,id`,
      config
    );

    dispatch({
      type: GET_EMAILCALLS,
      payload: res.data.calls,
    });
  };

  const getCampaignCalls = async (currentCampaign) => {
    const config = {
      headers: {
        "Authorization": `Token token=0308353ef587c7e0a52edb0383355f0a`,
      },
    };

    const { trackingNumbers } = currentCampaign;

    console.log(trackingNumbers);
    const numbers = trackingNumbers.toString();
    const res = await axios.get(
      `https://api.callrail.com/v3/a/423787543/calls.json?search=${numbers}&&fields=formatted_duration,recording_player,total_calls,formatted_customer_phone_number,created_at,id`,
      config
    );

    dispatch({
      type: GET_CAMPAIGNCALLS,
      payload: res.data.calls,
    });
  };

  return (
    <CallContext.Provider
      value={{
        calls: state.calls,
        call: state.call,
        filtered: state.filtered,
        thing: state.thing,
        leadCalls: state.leadCalls,

        emailCalls: state.emailCalls,
        campaignCalls: state.campaignCalls,
        getCalls,
        sendCall,
        getCampaignCalls,

        getEmailCalls,
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
