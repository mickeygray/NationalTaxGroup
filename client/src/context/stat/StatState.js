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
  GET_FILTER,
  GET_CAMPAIGN,
  GET_CURRENTEMAIL,
  GET_LISTLENGTH,
  GET_IDARRAY,
} from "../types";

const StatState = (props) => {
  const initialState = {
    report: {},
    reports: [],
    listLength: null,
    filterSelected: null,
    idArray: null,
    currentCampaign: null,
    currentEmail: null,
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

  //Aggregate dailys into a week weeklys into a month monthlys into a quarter quarterlys into years based on these reports

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

  const getFilterSelected = (query) => {
    console.log(query);
    dispatch({
      type: GET_FILTER,
      payload: query,
    });
  };

  const getCurrentCampaign = (campaign) => {
    const currentCampaign = campaign;
    dispatch({
      type: GET_CAMPAIGN,
      payload: currentCampaign,
    });
  };

  const getCurrentEmail = (email) => {
    const currentEmail = email;
    console.log(currentEmail);
    dispatch({
      type: GET_CURRENTEMAIL,
      payload: currentEmail,
    });
  };

  //export csv

  const getListLength = (mailList) => {
    const listLength = mailList.length;

    console.log(listLength);
    dispatch({
      type: GET_LISTLENGTH,
      payload: listLength,
    });
  };

  const getIdArray = (mailList) => {
    let idArray = [];
    mailList.forEach((lead) => idArray.push(lead._id));
    console.log(idArray);
    dispatch({
      type: GET_IDARRAY,
      payload: idArray,
    });
  };

  return (
    <StatContext.Provider
      value={{
        report: state.report,
        reports: state.reports,
        listLength: state.listLength,
        filterSelected: state.filterSelected,
        currentCampaign: state.currentCampaign,
        currentEmail: state.currentEmail,
        idArray: state.idArray,
        getListLength,
        getFilterSelected,
        getCurrentCampaign,
        getCurrentEmail,
        makeReport,
        getIdArray,
        updateReports,
        getReport,
        makeCSV,

        deleteReport,
      }}>
      {props.children}
    </StatContext.Provider>
  );
};

export default StatState;
