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
  GET_ALLPROSPECTS,
  GET_ALLDEALS,
  GET_ALLLEADS,
  FILTER_PAYMENTS,
  GET_PAYMENTS,
  SEARCH_PAYMENTDATES,
  GET_TODAYS,
  CLEAR_FILTER,
  GET_CLIENTPAYMENTS,
  GET_PAYMENTSTATUS,
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
    today: {},
  };

  const [state, dispatch] = useReducer(StatReducer, initialState);

  const filterPayments = async (text) => {
    dispatch({ type: FILTER_PAYMENTS, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const searchPaymentDates = async (ranges) => {
    const { selection } = ranges;
    const selectionString = JSON.stringify(selection);

    const res = await axios.get(
      `/api/prospects/payments/searchDates?q=${selectionString}`
    );

    dispatch({
      type: SEARCH_PAYMENTDATES,
      payload: res.data,
    });
  };

  const getTodaysPayments = async () => {
    const res = await axios.get(`/api/prospects/payments/today/`);

    dispatch({
      type: GET_PAYMENTS,
      payload: res.data,
    });

    getTodays(res.data);
  };

  const getTodaysCalls = async () => {
    const res = await axios.get(`/api/prospects/calls/today/`);

    dispatch({
      type: GET_ALLCALLS,
      payload: res.data,
    });

    getTodays(res.data);
  };

  const getTodaysProspects = async () => {
    const res = await axios.get(`/api/prospects/today/`);

    dispatch({
      type: GET_ALLPROSPECTS,
      payload: res.data,
    });

    getTodays(res.data);
  };

  const getTodaysLeads = async () => {
    const res = await axios.get(`/api/leads/today/`);

    dispatch({
      type: GET_ALLPROSPECTS,
      payload: res.data,
    });

    getTodays(res.data);
  };

  const getTodays = async (items) => {
    let dateDisplay1 = new Date(Date.now());
    let date = Intl.DateTimeFormat(
      "fr-CA",
      { timeZone: "America/Los_Angeles" },
      {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }
    ).format(dateDisplay1);

    console.log(items);

    let todaysPayments = [];
    let todaysCalls = [];
    let todaysProspects = [];
    let todaysLeads = [];
    let todaysNewClients = [];
    let todaysUpdatedClients = [];

    for (var i = 0; i < items.length; i++) {
      if (items[i].paymentDate && items[i].paymentDate.includes(date)) {
        todaysPayments.push(items[i]);
      } else if (items[i].start_time && items[i].start_time.includes(date)) {
        todaysCalls.push(items[i]);
      } else if (items[i].createDate && items[i].createDate.includes(date)) {
        todaysProspects.push(items[i]);
      } else if (items[i].loadDate && items[i].loadDate.includes(date)) {
        todaysLeads.push(items[i]);
      } else if (
        items[i].initialPaymentDate &&
        !items[i].lastPaymentDate &&
        items[i].initialPaymentDate.includes(date)
      ) {
        todaysNewClients.push(items[i]);
      } else if (
        items[i].lastpaymentDate &&
        items[i].lastPaymentDate.includes(date)
      ) {
        todaysUpdatedClients.push(items[i]);
      }
    }

    const today = {
      todaysPayments,
      todaysCalls,
      todaysProspects,
      todaysLeads,
      todaysNewClients,
      todaysUpdatedClients,
    };
    dispatch({
      type: GET_TODAYS,
      payload: today,
    });
  };

  const getPaymentStatus = async (prospect) => {
    const res = await axios.get(`/api/prospects/${prospect._id}/paymentStatus`);
    dispatch({
      type: GET_PAYMENTSTATUS,
      payload: res.data,
    });
  };

  const getPayments = async (currentClient) => {
    const res = await axios.get(
      `/api/prospects/${currentClient}/paymentSchedule`
    );

    dispatch({
      type: GET_CLIENTPAYMENTS,
      payload: res.data,
    });
  };
  const updatePayment = async (payment, currentClient, payid) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        _id: currentClient,
      },
    };

    const payobj = { payid };

    const res = await axios.put(
      `/api/prospects/${currentClient}/paymentSchedule/${payment._id}/paymentId`,
      payobj,
      config
    );

    dispatch({
      type: UPDATE_PAYMENTSTATUS,
      payload: res.data,
    });

    getPayments(currentClient);
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

  const userMoney = (myProspects) => {
    const payments = myProspects
      .map(
        (prospect) =>
          prospect.paymentStatus && Object.entries(prospect.paymentStatus)
      )
      .filter((x) => x != null);

    console.log(payments);
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

    dispatch({
      type: GET_CURRENTEMAIL,
      payload: currentEmail,
    });
  };

  //export cs
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
        today: state.today,
        reports: state.reports,
        listLength: state.listLength,
        filtered: state.filtered,
        filterSelected: state.filterSelected,
        currentCampaign: state.currentCampaign,
        currentEmail: state.currentEmail,
        idArray: state.idArray,
        getListLength,
        clearFilter,
        getPaymentStatus,
        updatePayment,
        getTodaysCalls,
        getFilterSelected,
        getCurrentCampaign,
        getCurrentEmail,
        makeReport,
        getIdArray,
        updateReports,
        getReport,
        userMoney,
        getPayments,
        getTodaysPayments,
        getTodaysProspects,
        getTodaysLeads,
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
