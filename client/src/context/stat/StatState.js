import React, { useReducer } from "react";
import axios from "axios";
import StatContext from "./statContext";
import StatReducer from "./statReducer";
import {
  MAKE_REPORT,
  UPDATE_REPORTS,
  DELETE_REPORT,
  GET_REPORT,
  MAKE_CSV,
  SEND_REPORT,
} from "../types";

const StatState = (props) => {
  const initialState = {
    report: {},
    reports: [],
  };

  const [state, dispatch] = useReducer(StatReducer, initialState);

  //make report
  const makeReport = async (campaign) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/reports", campaign, config);

    dispatch({
      type: MAKE_REPORT,
      payload: res.data,
    });
  };

  //update reports
  const updateReports = async (reports) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/reports", reports, config);

    dispatch({
      type: UPDATE_REPORTS,
      payload: res.data,
    });
  };

  //delete report
  const deleteReport = async (report) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.delete(
      `/api/reports/${report._id}`,
      report,
      config
    );

    dispatch({
      type: DELETE_REPORT,
      payload: res.data,
    });
  };

  //get report
  const getReport = async (report) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get("/api/reports", report, config);

    dispatch({
      type: GET_REPORT,
      payload: res.data,
    });
  };
  //generate csv

  const makeCSV = (res) => {
    dispatch({
      type: MAKE_CSV,
      payload: res.data,
    });
  };

  //export csv

  const sendReport = (res) => {
    dispatch({
      type: SEND_REPORT,
      payload: res.data,
    });
  };

  return (
    <StatContext.Provider
      value={{
        report: state.report,
        reports: state.reports,
        makeReport,
        updateReports,
        getReport,
        makeCSV,
        sendReport,
        deleteReport,
      }}>
      {props.children}
    </StatContext.Provider>
  );
};

export default StatState;
