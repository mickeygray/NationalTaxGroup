import React, { useReducer } from "react";
import axios from "axios";
import StatContext from "./statContext";
import StatReducer from "./statReducer";
import {} from "../types";

const StatState = (props) => {
  const initialState = {
      campaign: state.LeadState;
  };

  const [state, dispatch] = useReducer(StatReducer, initialState);

  return (
    <StatContext.Provider value={{}}>{props.children}</StatContext.Provider>
  );
};

export default CallState;
