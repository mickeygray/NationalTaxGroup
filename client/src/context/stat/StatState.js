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
  GET_ALLCALLS,
  FILTER_PAYMENTS,
  GET_PAYMENTS,
  SEARCH_PAYMENTDATES,
  CLEAR_FILTER,
  UPDATE_PAYMENTSTATUS,
} from "../types";

const StatState = (props) => {
  const initialState = {
    report: {},
    reports: [],
    listLength: null,
    filterSelected: null,
    filtered: null,
    idArray: null,
    currentCampaign: null,
    currentEmail: null,
    payments: [],
    todaysPayments: [],
  };

  const [state, dispatch] = useReducer(StatReducer, initialState);

  const filterPayments = async (text) => {
    dispatch({ type: FILTER_PAYMENTS, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const getTodaysPayments = async () => {
    const res = await axios.get(`/api/prospects/payments/search/`);

    dispatch({
      type: GET_PAYMENTS,
      payload: res.data,
    });

    searchPaymentDates(res.data);
  };
  const searchPaymentDates = async (payments) => {
    let dateDisplay1 = new Date(Date.now());
    let today = Intl.DateTimeFormat("fr-CA", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hours: "numeric",
      minutes: "numeric",
      seconds: "numeric",
    }).format(dateDisplay1);
    console.log(today);

    console.log(payments);

    var todaysPayments = [];
    for (var i = 0; i < payments.length; i++) {
      if (payments[i].paymentDate.includes(today)) {
        todaysPayments.push(payments[i]);
      }
    }

    dispatch({
      type: SEARCH_PAYMENTDATES,
      payload: todaysPayments,
    });
  };

  const updatePayment = async (payment, user, prospect) => {
    const res = await axios.put(
      `/api/prospects/${prospect._id}/paymentSchedule/${payment._id}/paymentId`
    );

    dispatch({
      type: UPDATE_PAYMENTSTATUS,
      payload: res.data,
    });
  };

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
    const filterSelected = Object.values(query).toString();
    dispatch({
      type: GET_FILTER,
      payload: filterSelected,
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

  const getAllCalls = async () => {
    const res = await axios.get("/api/calls");

    dispatch({
      type: GET_ALLCALLS,
      payload: res.data,
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
        payments: state.payments,
        todaysPayments: state.todaysPayments,
        reports: state.reports,
        listLength: state.listLength,
        filtered: state.filtered,
        filterSelected: state.filterSelected,
        currentCampaign: state.currentCampaign,
        currentEmail: state.currentEmail,
        idArray: state.idArray,
        getListLength,
        clearFilter,
        updatePayment,
        getAllCalls,
        getFilterSelected,
        getCurrentCampaign,
        getCurrentEmail,
        makeReport,
        getIdArray,
        updateReports,
        getReport,
        makeCSV,
        getTodaysPayments,
        filterPayments,
        clearFilter,
        searchPaymentDates,
        deleteReport,
      }}>
      {props.children}
    </StatContext.Provider>
  );
};

export default StatState;
