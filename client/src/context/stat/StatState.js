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
  SET_PERIOD,
  SET_TRACKINGPAYMENT,
  COMMISSION_PAYMENT,
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
    period: null,
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
      `/api/prospects/allPayments,/searchDates?q=${selectionString}`
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

  const commissionPayment = async (payment, currentClient, commissioned) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        _id: currentClient,
      },
    };

    const res = await axios.put(
      `/api/prospects/${currentClient}/paymentSchedule/${payment._id}/commissioned`,
      commissioned,
      config
    );

    dispatch({
      type: COMMISSION_PAYMENT,
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

  const setPeriod = () => {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff =
      now -
      start +
      (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);

    const year = [
      {
        month: 0,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("1/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("1/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("1/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 0,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("1/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("1/31/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("2/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 1,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("2/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("2/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("2/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 1,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("2/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("2/28/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("3/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 1,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("2/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("2/29/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("3/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 2,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("3/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("3/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("3/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 2,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("3/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("3/31/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("4/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 3,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("4/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("4/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("4/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 3,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("4/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("4/30/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("5/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 4,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("5/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("5/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("5/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 4,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("5/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("5/31/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("6/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 5,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("6/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("6/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("6/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 5,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("6/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("6/30/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("7/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 6,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("7/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("7/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("5/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 6,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("7/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("7/31/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("8/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 7,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("8/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("8/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("8/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 7,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("8/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("8/31/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("9/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 8,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("9/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("9/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("9/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 8,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("9/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("9/30/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("10/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 9,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("10/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("10/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("10/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 9,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("10/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("10/31/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("11/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 10,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("11/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("11/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("11/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 10,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("11/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("11/30/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("12/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 11,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("12/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("12/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("12/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 11,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("12/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("12/31/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("1/10/" + new Date(Date.now()).getFullYear() + 1)),
      },
    ];

    switch (true) {
      case day <= 15:
        state.period = year[0];
        break;
      case day > 15 && day <= 31:
        state.period = year[1];
        break;
      case day > 31 && day <= 46:
        state.period = year[2];
        break;
      case day > 46 &&
        day <= 59 &&
        new Date(
          "2/28/" + new Date(Date.now()).getFullYear() + 1
        ).getMonth() === 2:
        state.period = year[3];
        break;
      case day > 46 &&
        day <= 59 &&
        new Date(
          "2/28/" + new Date(Date.now()).getFullYear() + 1
        ).getMonth() === 1:
        state.period = year[4];
        break;
      case day === 60 && new Date(Date.now()).getMonth() === 1:
        state.period = year[4];
        break;
      case day === 60 && new Date(Date.now()).getMonth() === 2:
        state.period = year[5];
        break;
      case day > 60 && day <= 74:
        state.period = year[5];
        break;
      case day > 74 && day <= 90:
        state.period = year[6];
        break;
      case day > 90 && day <= 105:
        state.period = year[7];
      case day === 91 && new Date(Date.now()).getMonth() === 2:
        state.period = year[7];
        break;
      case day === 91 && new Date(Date.now()).getMonth() === 3:
        state.period = year[8];
        break;
      case day > 105 && day < 121:
        state.period = year[8];
        break;
      case day > 121 && day <= 135:
        state.period = year[9];
        break;
      case day === 121 && new Date(Date.now()).getMonth() === 3:
        state.period = year[9];
        break;
      case day === 121 && new Date(Date.now()).getMonth() === 4:
        state.period = year[10];
        break;
      case day > 135 && day <= 152:
        state.period = year[10];
        break;
      case day > 152 && day <= 166:
        state.period = year[11];
        break;
      case day === 152 && new Date(Date.now()).getMonth() === 4:
        state.period = year[11];
        break;
      case day === 152 && new Date(Date.now()).getMonth() === 5:
        state.period = year[12];
        break;
      case day > 166 && day <= 182:
        state.period = year[12];
        break;
      case day === 182 && new Date(Date.now()).getMonth() === 5:
        state.period = year[12];
        break;
      case day === 182 && new Date(Date.now()).getMonth() === 6:
        state.period = year[13];
        break;
      case day > 182 && day <= 196:
        state.period = year[13];
        break;
      case day > 196 && day <= 213:
        state.period = year[14];
        break;
      case day === 213 && new Date(Date.now()).getMonth() === 6:
        state.period = year[14];
        break;
      case day === 213 && new Date(Date.now()).getMonth() === 7:
        state.period = year[15];
        break;
      case day > 213 && day <= 227:
        state.period = year[15];
        break;
      case day > 227 && day <= 244:
        state.period = year[16];
        break;
      case day === 244 && new Date(Date.now()).getMonth() === 7:
        state.period = year[16];
        break;
      case day === 244 && new Date(Date.now()).getMonth() === 8:
        state.period = year[17];
        break;
      case day > 244 && day <= 258:
        state.period = year[17];
        break;
      case day > 258 && day <= 274:
        state.period = year[18];
        break;
      case day === 274 && new Date(Date.now()).getMonth() === 8:
        state.period = year[18];
        break;
      case day === 274 && new Date(Date.now()).getMonth() === 9:
        state.period = year[19];
        break;
      case day > 274 && day <= 288:
        state.period = year[19];
        break;
      case day > 288 && day <= 305:
        state.period = year[20];
        break;
      case day === 305 && new Date(Date.now()).getMonth() === 9:
        state.period = year[20];
        break;
      case day === 305 && new Date(Date.now()).getMonth() === 10:
        state.period = year[21];
        break;
      case day > 305 && day <= 319:
        state.period = year[21];
        break;
      case day > 319 && day <= 335:
        state.period = year[22];
        break;
      case day === 335 && new Date(Date.now()).getMonth() === 10:
        state.period = year[22];
        break;
      case day === 335 && new Date(Date.now()).getMonth() === 11:
        state.period = year[23];
        break;
      case day > 335 && day <= 349:
        state.period = year[23];
        break;
      case day > 349 && day <= 366:
        state.period = year[24];
        break;
    }

    dispatch({
      type: SET_PERIOD,
      payload: state.period,
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

  const setTrackingPayment = (payment) => {
    console.log(payment);
    dispatch({
      type: SET_TRACKINGPAYMENT,
      payload: payment,
    });
  };

  const userMoney = (myProspects, user, ranges) => {
    const today = new Date(Date.now());

    console.log(ranges);
    let eDate;

    let now;
    let day2;
    if (ranges) {
      now = new Date(ranges.selection.startDate);
      let now2 = new Date(ranges.selection.endDate);
      const start2 = new Date(now.getFullYear(), 0, 0);
      const diff2 =
        now2 -
        start2 +
        (start2.getTimezoneOffset() - now2.getTimezoneOffset()) * 60 * 1000;
      const oneDay = 1000 * 60 * 60 * 24;
      day2 = Math.floor(diff2 / oneDay);
    } else {
      now = new Date(today);
    }

    const start = new Date(now.getFullYear(), 0, 0);
    const diff =
      now -
      start +
      (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);

    const year = [
      {
        month: 0,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("1/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("1/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("1/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 0,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("1/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("1/31/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("2/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 1,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("2/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("2/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("2/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 1,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("2/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("2/28/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("3/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 1,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("2/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("2/29/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("3/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 2,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("3/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("3/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("3/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 2,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("3/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("3/31/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("4/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 3,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("4/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("4/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("4/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 3,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("4/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("4/30/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("5/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 4,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("5/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("5/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("5/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 4,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("5/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("5/31/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("6/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 5,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("6/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("6/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("6/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 5,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("6/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("6/30/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("7/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 6,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("7/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("7/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("5/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 6,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("7/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("7/31/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("8/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 7,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("8/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("8/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("8/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 7,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("8/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("8/31/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("9/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 8,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("9/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("9/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("9/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 8,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("9/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("9/30/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("10/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 9,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("10/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("10/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("10/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 9,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("10/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("10/31/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("11/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 10,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("11/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("11/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("11/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 10,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("11/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("11/30/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("12/10/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 11,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("12/1/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("12/15/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("12/25/" + new Date(Date.now()).getFullYear())),
      },
      {
        month: 11,
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("12/15/" + new Date(Date.now()).getFullYear())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("12/31/" + new Date(Date.now()).getFullYear())),
        payDay: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date("1/10/" + new Date(Date.now()).getFullYear() + 1)),
      },
    ];

    switch (true) {
      case day <= 15:
        state.period = year[0];
        break;
      case day > 15 && day <= 31:
        state.period = year[1];
        break;
      case day > 31 && day <= 46:
        state.period = year[2];
        break;
      case day > 46 &&
        day <= 59 &&
        new Date(
          "2/28/" + new Date(Date.now()).getFullYear() + 1
        ).getMonth() === 2:
        state.period = year[3];
        break;
      case day > 46 &&
        day <= 59 &&
        new Date(
          "2/28/" + new Date(Date.now()).getFullYear() + 1
        ).getMonth() === 1:
        state.period = year[4];
        break;
      case day === 60 && new Date(Date.now()).getMonth() === 1:
        state.period = year[4];
        break;
      case day === 60 && new Date(Date.now()).getMonth() === 2:
        state.period = year[5];
        break;
      case day > 60 && day <= 74:
        state.period = year[5];
        break;
      case day > 74 && day <= 90:
        state.period = year[6];
        break;
      case day > 90 && day <= 105:
        state.period = year[7];
      case day === 91 && new Date(Date.now()).getMonth() === 2:
        state.period = year[7];
        break;
      case day === 91 && new Date(Date.now()).getMonth() === 3:
        state.period = year[8];
        break;
      case day > 105 && day < 121:
        state.period = year[8];
        break;
      case day > 121 && day <= 135:
        state.period = year[9];
        break;
      case day === 121 && new Date(Date.now()).getMonth() === 3:
        state.period = year[9];
        break;
      case day === 121 && new Date(Date.now()).getMonth() === 4:
        state.period = year[10];
        break;
      case day > 135 && day <= 152:
        state.period = year[10];
        break;
      case day > 152 && day <= 166:
        state.period = year[11];
        break;
      case day === 152 && new Date(Date.now()).getMonth() === 4:
        state.period = year[11];
        break;
      case day === 152 && new Date(Date.now()).getMonth() === 5:
        state.period = year[12];
        break;
      case day > 166 && day <= 182:
        state.period = year[12];
        break;
      case day === 182 && new Date(Date.now()).getMonth() === 5:
        state.period = year[12];
        break;
      case day === 182 && new Date(Date.now()).getMonth() === 6:
        state.period = year[13];
        break;
      case day > 182 && day <= 196:
        state.period = year[13];
        break;
      case day > 196 && day <= 213:
        state.period = year[14];
        break;
      case day === 213 && new Date(Date.now()).getMonth() === 6:
        state.period = year[14];
        break;
      case day === 213 && new Date(Date.now()).getMonth() === 7:
        state.period = year[15];
        break;
      case day > 213 && day <= 227:
        state.period = year[15];
        break;
      case day > 227 && day <= 244:
        state.period = year[16];
        break;
      case day === 244 && new Date(Date.now()).getMonth() === 7:
        state.period = year[16];
        break;
      case day === 244 && new Date(Date.now()).getMonth() === 8:
        state.period = year[17];
        break;
      case day > 244 && day <= 258:
        state.period = year[17];
        break;
      case day > 258 && day <= 274:
        state.period = year[18];
        break;
      case day === 274 && new Date(Date.now()).getMonth() === 8:
        state.period = year[18];
        break;
      case day === 274 && new Date(Date.now()).getMonth() === 9:
        state.period = year[19];
        break;
      case day > 274 && day <= 288:
        state.period = year[19];
        break;
      case day > 288 && day <= 305:
        state.period = year[20];
        break;
      case day === 305 && new Date(Date.now()).getMonth() === 9:
        state.period = year[20];
        break;
      case day === 305 && new Date(Date.now()).getMonth() === 10:
        state.period = year[21];
        break;
      case day > 305 && day <= 319:
        state.period = year[21];
        break;
      case day > 319 && day <= 335:
        state.period = year[22];
        break;
      case day === 335 && new Date(Date.now()).getMonth() === 10:
        state.period = year[22];
        break;
      case day === 335 && new Date(Date.now()).getMonth() === 11:
        state.period = year[23];
        break;
      case day > 335 && day <= 349:
        state.period = year[23];
        break;
      case day > 349 && day <= 366:
        state.period = year[24];
        break;
    }

    var getDaysArray = function (s, e) {
      for (var a = [], d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
        a.push(
          Intl.DateTimeFormat(
            "en-US",
            {
              timeZone: "America/Los_Angeles",
            },
            {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }
          ).format(new Date(d))
        );
      }
      return a;
    };

    const periodDays = getDaysArray(
      new Date(state.period.periodStart),
      new Date(state.period.periodEnd)
    );

    var payments = [];
    function getPayments(prospects) {
      for (var i = 0; i < prospects.length; i++) {
        payments.push(prospects[i].paymentSchedule);
      }
      return payments;
    }

    getPayments(myProspects);

    let merged = [].concat.apply([], payments);

    var filtered = merged.filter(function (el) {
      return el != null;
    });

    let paymentArray = [];
    for (var i = 0; i < filtered.length; i++) {
      if (filtered[i].paymentAmount != null) {
        paymentArray.push(filtered[i]);
      }
    }

    console.log(paymentArray, "1343242343243");
    var dateFilter = paymentArray.filter((a) => {
      var date = new Date(a.paymentDate);
      return (
        date >= new Date(state.period.periodStart) &&
        date <= new Date(state.period.periodEnd)
      );
    });

    let rangeFilter = [];

    if (ranges) {
      rangeFilter = paymentArray.filter((a) => {
        var date = new Date(a.paymentDate);
        return (
          date >= new Date(ranges.selection.startDate) &&
          date <= new Date(ranges.selection.endDate)
        );
      });
    }
    let totalPay = [];
    let redPay = [];
    let refPay = [];
    let paymentsLeft = [];
    let payDay = [];

    let rangeMoney = {};

    if (rangeFilter.length > 0) {
      rangeFilter.forEach((payment) => {
        switch (true) {
          case payment.paymentId.length > 30:
            totalPay.push(payment);
            break;
          case payment.paymentId.length === 18:
            redPay.push(payment);
            break;
          case payment.paymentId.length === 19:
            refPay.push(payment);
            break;
          case payment.paymentId.length === 0:
            paymentsLeft.push(payment);
            break;
        }
      });
      const quoteArray = paymentsLeft.map(function (payment) {
        return payment.paymentAmount;
      });

      const payArray = totalPay.map(function (payment) {
        return payment.paymentAmount;
      });

      const redArray = redPay.map(function (payment) {
        return payment.paymentAmount;
      });

      const refArray = refPay.map(function (payment) {
        return payment.paymentAmount;
      });

      redArray.push(0);
      refArray.push(0);
      payArray.push(0);
      quoteArray.push(0);

      console.log(payArray, "asdsdsadlsajhldjkas");

      const paymentsRemaining = paymentsLeft.length;

      const reducer = (accumulator, currentValue) => accumulator + currentValue;

      const total = payArray.reduce(reducer).toFixed(2);
      const redLine = redArray.reduce(reducer).toFixed(2);
      const refunded = refArray.reduce(reducer).toFixed(2);
      const balance = quoteArray.reduce(reducer).toFixed(2);

      const quote = parseFloat(total) + parseFloat(balance);

      if (redLine < 1) redArray.pop();
      if (refArray < 1) refArray.pop();
      if (payArray < 1) payArray.pop();

      let gross = 0;
      let initialPaymentDate = 0;
      let lastPaymentDate = 0;
      let lastPayment = 0;
      let initial = 0;
      let percentPaid = 0;

      if (total > 0)
        initial = parseInt(
          totalPay
            .filter((payment) => payment.paymentIndex === 1)
            .map((payment) => payment.paymentAmount)
            .reduce((x, y) => x + y)
        );

      if (total > 0)
        lastPayment = totalPay.reduce((r, o) =>
          o.paymentDate > r.paymentDate ? o : r
        );
      if (total > 0) gross = quote - refunded;

      if (total > 0) percentPaid = total / gross;

      rangeMoney = {
        total,
        gross,
        initial,
        redLine,
        refunded,
        quote,
      };
    }

    dateFilter.forEach((payment) => {
      switch (true) {
        case payment.paymentId.length > 30:
          totalPay.push(payment);
          break;
        case payment.paymentId.length === 18:
          redPay.push(payment);
          break;
        case payment.paymentId.length === 19:
          refPay.push(payment);
          break;
        case payment.paymentId.length === 0:
          paymentsLeft.push(payment);
          break;
      }
    });
    const quoteArray = paymentsLeft.map(function (payment) {
      return payment.paymentAmount;
    });

    const payArray = totalPay.map(function (payment) {
      return payment.paymentAmount;
    });

    const redArray = redPay.map(function (payment) {
      return payment.paymentAmount;
    });

    const refArray = refPay.map(function (payment) {
      return payment.paymentAmount;
    });

    redArray.push(0);
    refArray.push(0);
    payArray.push(0);
    quoteArray.push(0);

    console.log(payArray);

    const paymentsRemaining = paymentsLeft.length;

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    const total = payArray.reduce(reducer).toFixed(2);
    const redLine = redArray.reduce(reducer).toFixed(2);
    const refunded = refArray.reduce(reducer).toFixed(2);
    const balance = quoteArray.reduce(reducer).toFixed(2);

    const quote = parseFloat(total) + parseFloat(balance);

    if (redLine < 1) redArray.pop();
    if (refArray < 1) refArray.pop();
    if (payArray < 1) payArray.pop();

    let gross = 0;
    let initialPaymentDate = 0;
    let lastPaymentDate = 0;
    let lastPayment = 0;
    let initial = 0;
    let percentPaid = 0;

    console.log(totalPay, "33454354354");
    if (total > 0)
      initial = parseInt(
        totalPay
          .filter((payment) => payment.paymentIndex === 1)
          .map((payment) => payment.paymentAmount)
          .reduce((x, y) => x + y)
      );

    if (total > 0)
      lastPayment = totalPay.reduce((r, o) =>
        o.paymentDate > r.paymentDate ? o : r
      );
    if (total > 0) gross = quote - refunded;

    if (total > 0) percentPaid = total / gross;

    const paycheck = user.payDay.reduce((x, y) => x + y);
    const periodMoney = {
      total,
      paycheck,
      gross,
      initial,
      redLine,
      refunded,
      quote,
    };

    const allPayments = myProspects
      .map((prospect) => prospect.paymentStatus && prospect.paymentStatus)
      .filter((x) => x != null);
    const gross1 = [];
    const initial1 = [];
    const total1 = [];
    const redline1 = [];
    const refunded1 = [];
    const quote1 = [];

    allPayments.map((prospect) => gross1.push(parseInt(prospect.gross)));

    allPayments
      .map((prospect) => initial1.push(parseInt(prospect.initial)))
      .reduce((a, b) => a + b);
    allPayments
      .map((prospect) => total1.push(parseInt(prospect.total)))
      .reduce((a, b) => a + b);
    allPayments
      .map((prospect) => redline1.push(prospect.redLine))
      .reduce((a, b) => a + b);
    allPayments
      .map((prospect) => refunded1.push(prospect.refunded))
      .reduce((a, b) => a + b);
    allPayments
      .map((prospect) => quote1.push(prospect.quote))
      .reduce((a, b) => a + b, 0);

    const allTimeMoney = {
      gross: gross1.reduce((a, b) => a + b),
      initial: initial1.reduce((a, b) => a + b),
      total: total1.reduce((a, b) => a + b),
      redline: redline1.reduce((a, b) => a + b),
      refunded: refunded1.reduce((a, b) => a + b),
      quote: quote1.reduce((a, b) => a + b),
    };

    console.log(periodMoney, "11111111111111111111111111111111");
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
        period: state.period,
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
        setTrackingPayment,
        commissionPayment,
        userMoney,
        setPeriod,
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
