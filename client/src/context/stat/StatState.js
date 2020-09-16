import React, { useReducer } from "react";
import axios from "axios";
import StatContext from "./statContext";
import StatReducer from "./statReducer";
import {
  GET_FILTER,
  GET_CAMPAIGN,
  GET_CURRENTEMAIL,
  GET_LISTLENGTH,
  GET_IDARRAY,
  GET_TODAYCALLS,
  GET_TODAYPROSPECTS,
  GET_TODAYCOSTS,
  GET_PERIODCOSTS,
  GET_TODAYLEADS,
  GET_PERIODCALLS,
  GET_PERIODPROSPECTS,
  GET_PERIODLEADS,
  GET_PERIODPAYMENTS,
  FILTER_PAYMENTS,
  GET_TODAYPAYMENTS,
  SEARCH_PAYMENTDATES,
  GET_TODAYS,
  GET_PERIOD,
  CLEAR_FILTER,
  GET_CLIENTPAYMENTS,
  GET_PAYMENTSTATUS,
  UPDATE_PAYMENTSTATUS,
  SET_PERIOD,
  SET_TRACKINGPAYMENT,
  COMMISSION_PAYMENT,
  GET_RECURRING,
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
    todayProspects: [],
    todayLeads: [],
    todayCalls: [],
    todayPayments: [],
    todayCosts: [],
    periodCosts: [],
    periodPaymentSummary: {},
    periodProspects: [],
    periodLeads: [],
    periodCalls: [],
    periodPayments: [],
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

  const getTodaysCalls = async () => {
    const res = await axios.get(`/api/prospects/calls/today/`);

    dispatch({
      type: GET_TODAYCALLS,
      payload: res.data,
    });

    getTodays(res.data);
  };

  const getTodaysCosts = async () => {
    const res = await axios.get(`/api/mail/costs/today`);

    dispatch({
      type: GET_TODAYCOSTS,
      payload: res.data,
    });
  };

  const getTodaysPayments = async () => {
    const res = await axios.get(`/api/prospects/payments/today/`);

    dispatch({
      type: GET_TODAYPAYMENTS,
      payload: res.data,
    });

    getTodays(res.data);
  };

  const getTodaysProspects = async () => {
    const res = await axios.get(`/api/prospects/today/`);

    dispatch({
      type: GET_TODAYPROSPECTS,
      payload: res.data,
    });

    getTodays(res.data);
  };

  const getTodaysLeads = async () => {
    const res = await axios.get(`/api/leads/today/`);

    dispatch({
      type: GET_TODAYLEADS,
      payload: res.data,
    });

    getTodays(res.data);
  };

  const getPeriodCalls = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const reqObj = {
      startDate: state.period.periodStart,
      endDate: state.period.periodEnd,
    };

    const string = JSON.stringify(reqObj);
    const res = await axios.get(
      `/api/prospects/calls/period?q=${string}`,
      config
    );

    dispatch({
      type: GET_PERIODCALLS,
      payload: res.data,
    });
    console.log(res.data, "CALLS");
    getPeriod(res.data);
  };

  const getPeriodPayments = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const reqObj = {
      startDate: state.period.periodStart,
      endDate: state.period.periodEnd,
    };

    const string = JSON.stringify(reqObj);
    const res = await axios.get(
      `/api/prospects/payments/period?q=${string}`,
      config
    );

    dispatch({
      type: GET_PERIODPAYMENTS,
      payload: res.data,
    });
    console.log(res.data, "PAYMENTS");
    getPeriod(res.data);
  };

  const getPeriodProspects = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const reqObj = {
      startDate: state.period.periodStart,
      endDate: state.period.periodEnd,
    };
    const string = JSON.stringify(reqObj);
    const res = await axios.get(`/api/prospects/period?q=${string}`, config);

    dispatch({
      type: GET_PERIODPROSPECTS,
      payload: res.data,
    });
    console.log(res.data, "PROSPECTS");
    getPeriod(res.data);
  };

  const getPeriodLeads = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(state.period);
    const reqObj = {
      startDate: state.period.periodStart,
      endDate: state.period.periodEnd,
    };

    const string = JSON.stringify(reqObj);

    console.log(reqObj);
    const res = await axios.get(`/api/leads/period?q=${string}`, config);

    dispatch({
      type: GET_PERIODLEADS,
      payload: res.data,
    });

    console.log(res.data, "LEADS");

    getPeriod(res.data);
  };

  const getTodays = async (items) => {
    for (var i = 0; i < items.length; i++) {
      if (
        items[i].start_time &&
        Intl.DateTimeFormat(
          "fr-CA",
          { timeZone: "America/Los_Angeles" },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date(items[i].start_time)) ===
          Intl.DateTimeFormat(
            "fr-CA",
            { timeZone: "America/Los_Angeles" },
            {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }
          ).format(new Date(Date.now()))
      ) {
        state.todayCalls.push(items[i]);
      } else if (
        items[i].createDate &&
        Intl.DateTimeFormat(
          "fr-CA",
          { timeZone: "America/Los_Angeles" },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date(items[i].createDate)) ===
          Intl.DateTimeFormat(
            "fr-CA",
            { timeZone: "America/Los_Angeles" },
            {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }
          ).format(new Date(Date.now()))
      ) {
        state.todayProspects.push(items[i]);
      } else if (
        items[i].loadDate &&
        Intl.DateTimeFormat(
          "fr-CA",
          { timeZone: "America/Los_Angeles" },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date(items[i].loadDate)) ===
          Intl.DateTimeFormat(
            "fr-CA",
            { timeZone: "America/Los_Angeles" },
            {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }
          ).format(new Date(Date.now()))
      ) {
        state.todayLeads.push(items[i]);
      } else if (
        items[i].paymentDate &&
        Intl.DateTimeFormat(
          "fr-CA",
          { timeZone: "America/Los_Angeles" },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date(items[i].paymentDate)) ===
          Intl.DateTimeFormat(
            "fr-CA",
            { timeZone: "America/Los_Angeles" },
            {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }
          ).format(new Date(Date.now()))
      ) {
        state.todayPayments.push(items[i]);
      }
    }

    state.todayProspects = state.todayProspects.filter(
      (object, index) =>
        index ===
        state.todayProspects.findIndex(
          (obj) => JSON.stringify(obj) === JSON.stringify(object)
        )
    );

    state.todayLeads = state.todayLeads.filter(
      (object, index) =>
        index ===
        state.todayLeads.findIndex(
          (obj) => JSON.stringify(obj) === JSON.stringify(object)
        )
    );
    state.todayCalls = state.todayCalls.filter(
      (object, index) =>
        index ===
        state.todayCalls.findIndex(
          (obj) => JSON.stringify(obj) === JSON.stringify(object)
        )
    );
    state.todayPayments = state.todayPayments.filter(
      (object, index) =>
        index ===
        state.todayPayments.findIndex(
          (obj) => JSON.stringify(obj) === JSON.stringify(object)
        )
    );

    let totalPay = [];
    let redPay = [];
    let refPay = [];
    let avgs = [];
    let todayPaymentAmount;
    let todayRefundAmount;
    let todayRedlineAmount;
    let todayRedlineCount;
    let todayRefundCount;
    let todayNewPaymentAmount;
    let todayClientCount;
    let todayAvgPayment;
    let todayPaymentMax;
    let todayRecurringPaymentAmount;
    let todayNewPaymentMax;
    let todayPaymentMin;
    let todayNewPaymentMin;
    let totals = {};
    let todayAvgs = {};

    state.todayPayments.forEach((payment) => {
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
      }

      todayPaymentAmount = totalPay
        .map((payment) => payment.paymentAmount)
        .reduce((x, y) => x + y, 0);

      todayPaymentMin = Math.min(
        ...totalPay.map((payment) => payment.paymentAmount)
      );
      todayPaymentMax = Math.max(
        ...totalPay.map((payment) => payment.paymentAmount)
      );

      todayNewPaymentAmount = totalPay
        .filter((payment) => payment.paymentIndex === 1)
        .map((payment) => payment.paymentAmount)
        .reduce((x, y) => x + y, 0);

      if (todayNewPaymentAmount > 0) {
        todayRecurringPaymentAmount =
          todayPaymentAmount - todayNewPaymentAmount;
        todayNewPaymentMax = Math.max(
          ...totalPay
            .filter((payment) => payment.paymentIndex === 1)
            .map((payment) => payment.paymentAmount)
        );

        todayNewPaymentMin = Math.min(
          ...totalPay
            .filter((payment) => payment.paymentIndex === 1)
            .map((payment) => payment.paymentAmount)
        );
      } else {
        todayRecurringPaymentAmount = todayPaymentAmount;
        todayNewPaymentMax = 0;
        todayNewPaymentMin = 0;
      }
      todayRefundAmount = refPay
        .map((payment) => payment.paymentAmount)

        .reduce((x, y) => x + y, 0);

      todayRefundCount = refPay.length;

      todayRedlineCount = redPay.length;

      todayRedlineAmount = redPay
        .map((payment) => payment.paymentAmount)

        .reduce((x, y) => x + y, 0);

      const todayClients = state.todayProspects.filter(
        (prospect) => prospect.status === "client"
      );

      console.log(todayClients);
      if (todayClients.length > 0) {
        todayClientCount = todayClients.length;
        todayClients.map((prospect, i) =>
          avgs[i]
            ? ((avgs[i].gross = prospect.paymentStatus.gross),
              (avgs[i].total = prospect.paymentStatus.total),
              (avgs[i].initial = prospect.paymentStatus.initial))
            : (avgs[i] = {
                gross: prospect.paymentStatus.gross,
                total: prospect.paymentStatus.total,
                initial: prospect.paymentStatus.initial,
              })
        );

        totals = avgs.reduce((a, b) => ({
          total: parseFloat(a.total) + parseFloat(b.total),
          initial: parseFloat(a.initial) + parseFloat(b.initial),
          gross: parseFloat(a.gross) + parseFloat(b.gross),
        }));

        todayAvgs = avgs.reduce((a, b) => ({
          total: (a.total + b.total) / avgs.length,
          initial: (a.initial + b.initial) / avgs.length,
          gross: (parseFloat(a.gross) + parseFloat(b.gross)) / avgs.length,
        }));

        console.log(totals);
      } else {
        todayClientCount = 0;
      }

      if (state.todayPayments.length > 0) {
        todayAvgPayment = todayNewPaymentAmount / state.todayPayments.length;
      } else {
        todayAvgPayment = 0;
      }

      let todayNewTollFree = [];
      state.todayProspects.map((prospect, i) =>
        todayNewTollFree[i]
          ? ((todayNewTollFree[i].tracking = prospect.tracking),
            (todayNewTollFree[i].source = prospect.source),
            (todayNewTollFree[i].paymentSchedule = prospect.paymentSchedule),
            (todayNewTollFree[i].paymentStatus = prospect.paymentStatus))
          : (todayNewTollFree[i] = {
              tracking: prospect.tracking,
              source: prospect.source,
              paymentSchedule: prospect.paymentSchedule,
              paymentStatus: prospect.paymentStatus,
            })
      );

      let trackingTotalPay = [];
      let trackingRedPay = [];
      let trackingRefPay = [];
      let trackingInitialPay = [];
      let trackingGrossPay = [];
      let trackingPaymentAmount;
      let trackingRefundAmount;
      let trackingRedlineAmount;
      let trackingNewPaymentAmount;
      let trackingClientCount;
      let trackingAvgPayment;
      let trackingPaymentMax;
      let trackingRecurringPaymentAmount;
      let trackingNewPaymentMax;
      let trackingPaymentMin;
      let trackingNewPaymentMin;
      let trackingTotals = {};
      let trackingTodayAvgs = {};

      console.log(todayNewTollFree);
      const todayNewTollFreePayments = todayNewTollFree.reduce(function (
        res,
        obj
      ) {
        let key = obj.tracking;
        if (res[key]) {
          res[key] = res[key].concat(obj.paymentSchedule);
        } else res[key] = obj.paymentSchedule;
        return res;
      },
      {});

      Object.entries(todayNewTollFreePayments).forEach((tollFree) => {
        tollFree[1].forEach((payment) => {
          switch (true) {
            case payment.paymentId.length > 30:
              let key = tollFree[0];
              let newObj = { [key]: payment.paymentAmount };

              trackingTotalPay.push(newObj);

              break;
            case payment.paymentId.length === 18:
              let key1 = tollFree[0];
              let newObj1 = { [key1]: payment.paymentAmount };

              trackingRedPay.push(newObj1);
              break;
            case payment.paymentId.length === 19:
              let key2 = tollFree[0];
              let newObj2 = { [key2]: payment.paymentAmount };

              trackingRefPay.push(newObj2);

              break;
          }
        });
      });

      Object.entries(todayNewTollFreePayments).forEach((tollFree) => {
        tollFree[1].forEach((payment) => {
          switch (true) {
            case payment.paymentIndex > 0 && payment.paymentId.length != 19:
              let key4 = tollFree[0];
              let newObj4 = { [key4]: payment.paymentAmount };

              return trackingGrossPay.push(newObj4);

              break;
          }
        });
      });

      console.log(trackingGrossPay);

      Object.entries(todayNewTollFreePayments).forEach((tollFree) => {
        tollFree[1].forEach((payment) => {
          switch (true) {
            case payment.paymentIndex < 2 && payment.paymentId.length > 30:
              let key3 = tollFree[0];
              let newObj3 = { [key3]: payment.paymentAmount };

              return trackingInitialPay.push(newObj3);

              break;
          }
        });
      });

      trackingInitialPay = Object.entries(
        trackingInitialPay.reduce((acc, i) => {
          Object.keys(i).forEach((key) =>
            acc.hasOwnProperty(key)
              ? acc[key].push(i[key])
              : (acc[key] = [i[key]])
          );
          return acc;
        }, {})
      ).map((entry) => {
        var [key, value] = entry;
        return { [key]: ["initial", value.reduce((x, y) => x + y)] };
      });

      trackingGrossPay = Object.entries(
        trackingGrossPay.reduce((acc, i) => {
          Object.keys(i).forEach((key) =>
            acc.hasOwnProperty(key)
              ? acc[key].push(i[key])
              : (acc[key] = [i[key]])
          );
          return acc;
        }, {})
      ).map((entry) => {
        var [key, value] = entry;
        return { [key]: ["gross", value.reduce((x, y) => x + y)] };
      });

      console.log(trackingInitialPay);

      trackingTotalPay = Object.entries(
        trackingTotalPay.reduce((acc, i) => {
          Object.keys(i).forEach((key) =>
            acc.hasOwnProperty(key)
              ? acc[key].push(i[key])
              : (acc[key] = [i[key]])
          );
          return acc;
        }, {})
      ).map((entry) => {
        var [key, value] = entry;
        return { [key]: ["total", value.reduce((x, y) => x + y)] };
      });

      trackingRedPay = Object.entries(
        trackingRedPay.reduce((acc, i) => {
          Object.keys(i).forEach((key) =>
            acc.hasOwnProperty(key)
              ? acc[key].push(i[key])
              : (acc[key] = [i[key]])
          );
          return acc;
        }, {})
      ).map((entry) => {
        var [key, value] = entry;
        return { [key]: ["redLine", value.reduce((x, y) => x + y)] };
      });

      trackingRefPay = Object.entries(
        trackingRefPay.reduce((acc, i) => {
          Object.keys(i).forEach((key) =>
            acc.hasOwnProperty(key)
              ? acc[key].push(i[key])
              : (acc[key] = [i[key]])
          );
          return acc;
        }, {})
      ).map((entry) => {
        var [key, value] = entry;
        return { [key]: ["refunded", value.reduce((x, y) => x + y)] };
      });

      let trackingPayments = trackingTotalPay.concat(
        trackingRedPay,
        trackingRefPay,
        trackingInitialPay,
        trackingGrossPay
      );

      trackingPayments = trackingPayments.reduce((acc, i) => {
        Object.keys(i).forEach((key) =>
          acc.hasOwnProperty(key)
            ? acc[key].push(i[key])
            : (acc[key] = [i[key]])
        );
        return acc;
      }, {});

      let todayTrackingPayments = [];
      Object.keys(trackingPayments).forEach(function (key) {
        const payObj = Object.fromEntries(trackingPayments[key]);
        let value = { [key]: payObj };
        todayTrackingPayments.push(value);
      });

      console.log(todayNewTollFree);

      let todayCallIds = [];

      todayNewTollFree.map((tollFree) => {
        const ids = [].concat(
          state.todayProspects
            .filter((prospect) => prospect.tracking === tollFree.tracking)
            .map((prospect) => prospect.lienid)
        );
        todayCallIds.concat(ids);
      });

      let todayNewSales = [];
      state.todayProspects.map((prospect, i) =>
        todayNewSales[i]
          ? ((todayNewSales[i].sales = prospect.caseWorkers.originators.concat(
              prospect.caseWorkers.upsells,
              prospect.caseWorkers.documentProcessors,
              prospect.caseWorkers.loanProcessors
            )),
            (todayNewSales[i].paymentSchedule = prospect.paymentSchedule),
            (todayNewSales[i].paymentStatus = prospect.paymentStatus))
          : (todayNewSales[i] = {
              sales: prospect.caseWorkers.originators
                .concat(
                  prospect.caseWorkers.upsells,
                  prospect.caseWorkers.documentProcessors,
                  prospect.caseWorkers.loanProcessors
                )
                .map((sales) => sales.name),
              paymentSchedule: prospect.paymentSchedule,
              paymentStatus: prospect.paymentStatus,
            })
      );

      let salesTotalPay = [];
      let salesRedPay = [];
      let salesRefPay = [];
      let salesInitialPay = [];
      let salesGrossPay = [];

      console.log(todayNewSales);

      const todayNewSalesPayments = todayNewSales.reduce(function (res, obj) {
        let key;
        obj.sales.forEach((salesperson) => {
          key = salesperson;
          if (res[key]) {
            res[key] = res[key].concat(obj.paymentSchedule);
          } else res[key] = obj.paymentSchedule;
        });

        return res;
      }, {});

      console.log(todayNewSalesPayments);

      Object.entries(todayNewSalesPayments).forEach((sales) => {
        sales[1].forEach((payment) => {
          switch (true) {
            case payment.paymentId.length > 30:
              let key = sales[0];
              let newObj = { [key]: payment.paymentAmount };

              salesTotalPay.push(newObj);

              break;
            case payment.paymentId.length === 18:
              let key1 = sales[0];
              let newObj1 = { [key1]: payment.paymentAmount };

              salesRedPay.push(newObj1);
              break;
            case payment.paymentId.length === 19:
              let key2 = sales[0];
              let newObj2 = { [key2]: payment.paymentAmount };

              salesRefPay.push(newObj2);

              break;
          }
        });
      });

      Object.entries(todayNewSalesPayments).forEach((sales) => {
        sales[1].forEach((payment) => {
          switch (true) {
            case payment.paymentIndex > 0 && payment.paymentId.length != 19:
              let key4 = sales[0];
              let newObj4 = { [key4]: payment.paymentAmount };

              return salesGrossPay.push(newObj4);

              break;
          }
        });
      });

      Object.entries(todayNewSalesPayments).forEach((sales) => {
        sales[1].forEach((payment) => {
          switch (true) {
            case payment.paymentIndex < 2 && payment.paymentId.length > 30:
              let key3 = sales[0];
              let newObj3 = { [key3]: payment.paymentAmount };

              return salesInitialPay.push(newObj3);

              break;
          }
        });
      });

      salesInitialPay = Object.entries(
        salesInitialPay.reduce((acc, i) => {
          Object.keys(i).forEach((key) =>
            acc.hasOwnProperty(key)
              ? acc[key].push(i[key])
              : (acc[key] = [i[key]])
          );
          return acc;
        }, {})
      ).map((entry) => {
        var [key, value] = entry;
        return { [key]: ["initial", value.reduce((x, y) => x + y)] };
      });

      salesGrossPay = Object.entries(
        salesGrossPay.reduce((acc, i) => {
          Object.keys(i).forEach((key) =>
            acc.hasOwnProperty(key)
              ? acc[key].push(i[key])
              : (acc[key] = [i[key]])
          );
          return acc;
        }, {})
      ).map((entry) => {
        var [key, value] = entry;
        return { [key]: ["gross", value.reduce((x, y) => x + y)] };
      });

      salesTotalPay = Object.entries(
        salesTotalPay.reduce((acc, i) => {
          Object.keys(i).forEach((key) =>
            acc.hasOwnProperty(key)
              ? acc[key].push(i[key])
              : (acc[key] = [i[key]])
          );
          return acc;
        }, {})
      ).map((entry) => {
        var [key, value] = entry;
        return { [key]: ["total", value.reduce((x, y) => x + y)] };
      });

      salesRedPay = Object.entries(
        salesRedPay.reduce((acc, i) => {
          Object.keys(i).forEach((key) =>
            acc.hasOwnProperty(key)
              ? acc[key].push(i[key])
              : (acc[key] = [i[key]])
          );
          return acc;
        }, {})
      ).map((entry) => {
        var [key, value] = entry;
        return { [key]: ["redLine", value.reduce((x, y) => x + y)] };
      });

      salesRefPay = Object.entries(
        salesRefPay.reduce((acc, i) => {
          Object.keys(i).forEach((key) =>
            acc.hasOwnProperty(key)
              ? acc[key].push(i[key])
              : (acc[key] = [i[key]])
          );
          return acc;
        }, {})
      ).map((entry) => {
        var [key, value] = entry;
        return { [key]: ["refunded", value.reduce((x, y) => x + y)] };
      });

      let salesPayments = salesTotalPay.concat(
        salesRedPay,
        salesRefPay,
        salesInitialPay,
        salesGrossPay
      );

      salesPayments = salesPayments.reduce((acc, i) => {
        Object.keys(i).forEach((key) =>
          acc.hasOwnProperty(key)
            ? acc[key].push(i[key])
            : (acc[key] = [i[key]])
        );
        return acc;
      }, {});

      let todaySalesPayments = [];
      Object.keys(salesPayments).forEach(function (key) {
        const payObj = Object.fromEntries(salesPayments[key]);
        let value = { [key]: payObj };
        todaySalesPayments.push(value);
      });
      const today = {
        todayPayments: state.todayPayments,
        todayPaymentAmount,
        todayRedlineAmount,
        todayRefundAmount,
        todayRefundCount,
        todayRedlineCount,
        todayNewPaymentAmount,
        todayPaymentMin,
        todayPaymentMax,
        todayNewPaymentMin,
        todayNewPaymentMax,
        todayRecurringPaymentAmount,
        todayClientCount,
        todayClients,
        todayAvgPayment,
        todayTrackingPayments,
        todayCallIds,
        todayNewGross: totals.gross,
        todayNewInitial: totals.initial,
        todayNewTotal: totals.total,
        todayAvgGross: todayAvgs.gross,
        todayAvgInitial: todayAvgs.initial,
        todayAvgTotal: todayAvgs.total,
        todaySalesPayments,
        todayCalls: state.todayCalls,
        todayProspects: state.todayProspects,
        todayLeads: state.todayLeads,
      };
      dispatch({
        type: GET_TODAYS,
        payload: today,
      });
    });
  };

  const getDailyCosts = async () => {};

  const getPeriodCosts = async () => {};

  const getRangeCosts = async () => {};

  const getPeriod = async (items) => {
    for (var i = 0; i < items.length; i++) {
      if (
        items[i].start_time &&
        Intl.DateTimeFormat(
          "fr-CA",
          { timeZone: "America/Los_Angeles" },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date(items[i].start_time)) >=
          Intl.DateTimeFormat(
            "fr-CA",
            { timeZone: "America/Los_Angeles" },
            {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }
          ).format(new Date(state.period.periodStart)) &&
        Intl.DateTimeFormat(
          "fr-CA",
          { timeZone: "America/Los_Angeles" },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date(items[i].start_time)) <=
          Intl.DateTimeFormat(
            "fr-CA",
            { timeZone: "America/Los_Angeles" },
            {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }
          ).format(new Date(state.period.periodEnd))
      ) {
        state.periodCalls.push(items[i]);
      } else if (
        items[i].createDate &&
        Intl.DateTimeFormat(
          "fr-CA",
          { timeZone: "America/Los_Angeles" },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date(items[i].createDate)) >=
          Intl.DateTimeFormat(
            "fr-CA",
            { timeZone: "America/Los_Angeles" },
            {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }
          ).format(new Date(state.period.periodStart)) &&
        Intl.DateTimeFormat(
          "fr-CA",
          { timeZone: "America/Los_Angeles" },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date(items[i].createDate)) <=
          Intl.DateTimeFormat(
            "fr-CA",
            { timeZone: "America/Los_Angeles" },
            {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }
          ).format(new Date(state.period.periodEnd))
      ) {
        state.periodProspects.push(items[i]);
      } else if (
        items[i].loadDate &&
        Intl.DateTimeFormat(
          "fr-CA",
          { timeZone: "America/Los_Angeles" },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date(items[i].loadDate)) >=
          Intl.DateTimeFormat(
            "fr-CA",
            { timeZone: "America/Los_Angeles" },
            {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }
          ).format(new Date(state.period.periodStart)) &&
        Intl.DateTimeFormat(
          "fr-CA",
          { timeZone: "America/Los_Angeles" },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date(items[i].loadDate)) <=
          Intl.DateTimeFormat(
            "fr-CA",
            { timeZone: "America/Los_Angeles" },
            {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }
          ).format(new Date(state.period.periodEnd))
      ) {
        state.periodLeads.push(items[i]);
      } else if (
        items[i].paymentDate &&
        Intl.DateTimeFormat(
          "fr-CA",
          { timeZone: "America/Los_Angeles" },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date(items[i].paymentDate)) >=
          Intl.DateTimeFormat(
            "fr-CA",
            { timeZone: "America/Los_Angeles" },
            {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }
          ).format(new Date(state.period.periodStart)) &&
        Intl.DateTimeFormat(
          "fr-CA",
          { timeZone: "America/Los_Angeles" },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date(items[i].paymentDate)) <=
          Intl.DateTimeFormat(
            "fr-CA",
            { timeZone: "America/Los_Angeles" },
            {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }
          ).format(new Date(state.period.periodEnd))
      ) {
        state.periodPayments.push(items[i]);
      }
    }

    state.periodProspects = state.periodProspects.filter(
      (object, index) =>
        index ===
        state.periodProspects.findIndex(
          (obj) => JSON.stringify(obj) === JSON.stringify(object)
        )
    );

    state.periodLeads = state.periodLeads.filter(
      (object, index) =>
        index ===
        state.periodLeads.findIndex(
          (obj) => JSON.stringify(obj) === JSON.stringify(object)
        )
    );
    state.periodCalls = state.periodCalls.filter(
      (object, index) =>
        index ===
        state.periodCalls.findIndex(
          (obj) => JSON.stringify(obj) === JSON.stringify(object)
        )
    );
    state.periodPayments = state.periodPayments.filter(
      (object, index) =>
        index ===
        state.periodPayments.findIndex(
          (obj) => JSON.stringify(obj) === JSON.stringify(object)
        )
    );

    console.log(state.periodCalls, "PERIOD FAFFFFFFFFFFFFFFFFFF");

    let totalPay = [];
    let redPay = [];
    let refPay = [];
    let avgs = [];
    let periodPaymentAmount;
    let periodRefundAmount;
    let periodRedlineAmount;
    let periodRefundCount;
    let periodRedlineCount;
    let periodNewPaymentAmount;
    let periodClientCount;
    let periodAvgPayment;
    let periodPaymentMax;
    let periodRecurringPaymentAmount;
    let periodNewPaymentMax;
    let periodPaymentMin;
    let periodNewPaymentMin;
    let totals = {};
    let periodAvgs = {};

    state.periodPayments.forEach((payment) => {
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
      }

      periodPaymentAmount = totalPay
        .map((payment) => payment.paymentAmount)
        .reduce((x, y) => x + y, 0);

      periodPaymentMin = Math.min(
        ...totalPay.map((payment) => payment.paymentAmount)
      );
      periodPaymentMax = Math.max(
        ...totalPay.map((payment) => payment.paymentAmount)
      );

      periodNewPaymentAmount = totalPay
        .filter((payment) => payment.paymentIndex === 1)
        .map((payment) => payment.paymentAmount)
        .reduce((x, y) => x + y, 0);

      if (periodNewPaymentAmount > 0) {
        periodRecurringPaymentAmount =
          periodPaymentAmount - periodNewPaymentAmount;
        periodNewPaymentMax = Math.max(
          ...totalPay
            .filter((payment) => payment.paymentIndex === 1)
            .map((payment) => payment.paymentAmount)
        );

        periodNewPaymentMin = Math.min(
          ...totalPay
            .filter((payment) => payment.paymentIndex === 1)
            .map((payment) => payment.paymentAmount)
        );
      } else {
        periodRecurringPaymentAmount = periodPaymentAmount;
        periodNewPaymentMax = 0;
        periodNewPaymentMin = 0;
      }
      periodRefundAmount = refPay
        .map((payment) => payment.paymentAmount)

        .reduce((x, y) => x + y, 0);

      periodRefundCount = refPay.length;
      periodRedlineCount = redPay.length;
      periodRedlineAmount = redPay
        .map((payment) => payment.paymentAmount)

        .reduce((x, y) => x + y, 0);

      const periodClients = state.periodProspects.filter(
        (prospect) => prospect.status === "client"
      );

      console.log(periodClients);
      if (periodClients.length > 0) {
        periodClientCount = periodClients.length;
        periodClients.map((prospect, i) =>
          avgs[i]
            ? ((avgs[i].gross = prospect.paymentStatus.gross),
              (avgs[i].total = prospect.paymentStatus.total),
              (avgs[i].initial = prospect.paymentStatus.initial))
            : (avgs[i] = {
                gross: prospect.paymentStatus.gross,
                total: prospect.paymentStatus.total,
                initial: prospect.paymentStatus.initial,
              })
        );

        totals = avgs.reduce((a, b) => ({
          total: parseFloat(a.total) + parseFloat(b.total),
          initial: parseFloat(a.initial) + parseFloat(b.initial),
          gross: parseFloat(a.gross) + parseFloat(b.gross),
        }));

        periodAvgs = avgs.reduce((a, b) => ({
          total: (a.total + b.total) / avgs.length,
          initial: (a.initial + b.initial) / avgs.length,
          gross: (parseFloat(a.gross) + parseFloat(b.gross)) / avgs.length,
        }));

        console.log(totals);
      } else {
        periodClientCount = 0;
      }

      if (state.periodPayments.length > 0) {
        periodAvgPayment = periodNewPaymentAmount / state.periodPayments.length;
      } else {
        periodAvgPayment = 0;
      }

      let periodNewTollFree = [];
      state.periodProspects.map((prospect, i) =>
        periodNewTollFree[i]
          ? ((periodNewTollFree[i].tracking = prospect.tracking),
            (periodNewTollFree[i].source = prospect.source),
            (periodNewTollFree[i].paymentSchedule = prospect.paymentSchedule),
            (periodNewTollFree[i].paymentStatus = prospect.paymentStatus))
          : (periodNewTollFree[i] = {
              tracking: prospect.tracking,
              source: prospect.source,
              paymentSchedule: prospect.paymentSchedule,
              paymentStatus: prospect.paymentStatus,
            })
      );

      let trackingTotalPay = [];
      let trackingRedPay = [];
      let trackingRefPay = [];
      let trackingInitialPay = [];
      let trackingGrossPay = [];
      let trackingPaymentAmount;
      let trackingRefundAmount;
      let trackingRedlineAmount;
      let trackingNewPaymentAmount;
      let trackingClientCount;
      let trackingAvgPayment;
      let trackingPaymentMax;
      let trackingRecurringPaymentAmount;
      let trackingNewPaymentMax;
      let trackingPaymentMin;
      let trackingNewPaymentMin;
      let trackingTotals = {};
      let trackingTodayAvgs = {};

      const periodNewTollFreePayments = periodNewTollFree.reduce(function (
        res,
        obj
      ) {
        let key = obj.tracking;
        if (res[key]) {
          res[key] = res[key].concat(obj.paymentSchedule);
        } else res[key] = obj.paymentSchedule;
        return res;
      },
      {});

      Object.entries(periodNewTollFreePayments).forEach((tollFree) => {
        tollFree[1].forEach((payment) => {
          switch (true) {
            case payment.paymentId.length > 30:
              let key = tollFree[0];
              let newObj = { [key]: payment.paymentAmount };

              trackingTotalPay.push(newObj);

              break;
            case payment.paymentId.length === 18:
              let key1 = tollFree[0];
              let newObj1 = { [key1]: payment.paymentAmount };

              trackingRedPay.push(newObj1);
              break;
            case payment.paymentId.length === 19:
              let key2 = tollFree[0];
              let newObj2 = { [key2]: payment.paymentAmount };

              trackingRefPay.push(newObj2);

              break;
          }
        });
      });

      Object.entries(periodNewTollFreePayments).forEach((tollFree) => {
        tollFree[1].forEach((payment) => {
          switch (true) {
            case payment.paymentIndex > 0 && payment.paymentId.length != 19:
              let key4 = tollFree[0];
              let newObj4 = { [key4]: payment.paymentAmount };

              return trackingGrossPay.push(newObj4);

              break;
          }
        });
      });

      console.log(trackingGrossPay);

      Object.entries(periodNewTollFreePayments).forEach((tollFree) => {
        tollFree[1].forEach((payment) => {
          switch (true) {
            case payment.paymentIndex < 2 && payment.paymentId.length > 30:
              let key3 = tollFree[0];
              let newObj3 = { [key3]: payment.paymentAmount };

              return trackingInitialPay.push(newObj3);

              break;
          }
        });
      });

      trackingInitialPay = Object.entries(
        trackingInitialPay.reduce((acc, i) => {
          Object.keys(i).forEach((key) =>
            acc.hasOwnProperty(key)
              ? acc[key].push(i[key])
              : (acc[key] = [i[key]])
          );
          return acc;
        }, {})
      ).map((entry) => {
        var [key, value] = entry;
        return { [key]: ["initial", value.reduce((x, y) => x + y)] };
      });

      trackingGrossPay = Object.entries(
        trackingGrossPay.reduce((acc, i) => {
          Object.keys(i).forEach((key) =>
            acc.hasOwnProperty(key)
              ? acc[key].push(i[key])
              : (acc[key] = [i[key]])
          );
          return acc;
        }, {})
      ).map((entry) => {
        var [key, value] = entry;
        return { [key]: ["gross", value.reduce((x, y) => x + y)] };
      });

      console.log(trackingInitialPay);

      trackingTotalPay = Object.entries(
        trackingTotalPay.reduce((acc, i) => {
          Object.keys(i).forEach((key) =>
            acc.hasOwnProperty(key)
              ? acc[key].push(i[key])
              : (acc[key] = [i[key]])
          );
          return acc;
        }, {})
      ).map((entry) => {
        var [key, value] = entry;
        return { [key]: ["total", value.reduce((x, y) => x + y)] };
      });

      trackingRedPay = Object.entries(
        trackingRedPay.reduce((acc, i) => {
          Object.keys(i).forEach((key) =>
            acc.hasOwnProperty(key)
              ? acc[key].push(i[key])
              : (acc[key] = [i[key]])
          );
          return acc;
        }, {})
      ).map((entry) => {
        var [key, value] = entry;
        return { [key]: ["redLine", value.reduce((x, y) => x + y)] };
      });

      trackingRefPay = Object.entries(
        trackingRefPay.reduce((acc, i) => {
          Object.keys(i).forEach((key) =>
            acc.hasOwnProperty(key)
              ? acc[key].push(i[key])
              : (acc[key] = [i[key]])
          );
          return acc;
        }, {})
      ).map((entry) => {
        var [key, value] = entry;
        return { [key]: ["refunded", value.reduce((x, y) => x + y)] };
      });

      let trackingPayments = trackingTotalPay.concat(
        trackingRedPay,
        trackingRefPay,
        trackingInitialPay,
        trackingGrossPay
      );

      trackingPayments = trackingPayments.reduce((acc, i) => {
        Object.keys(i).forEach((key) =>
          acc.hasOwnProperty(key)
            ? acc[key].push(i[key])
            : (acc[key] = [i[key]])
        );
        return acc;
      }, {});

      let periodTrackingPayments = [];
      Object.keys(trackingPayments).forEach(function (key) {
        const payObj = Object.fromEntries(trackingPayments[key]);
        let value = { [key]: payObj };
        periodTrackingPayments.push(value);
      });
      let periodNewSales = [];
      state.periodProspects.map((prospect, i) =>
        periodNewSales[i]
          ? ((periodNewSales[i].sales = prospect.caseWorkers.originators.concat(
              prospect.caseWorkers.upsells,
              prospect.caseWorkers.documentProcessors,
              prospect.caseWorkers.loanProcessors
            )),
            (periodNewSales[i].paymentSchedule = prospect.paymentSchedule),
            (periodNewSales[i].paymentStatus = prospect.paymentStatus))
          : (periodNewSales[i] = {
              sales: prospect.caseWorkers.originators
                .concat(
                  prospect.caseWorkers.upsells,
                  prospect.caseWorkers.documentProcessors,
                  prospect.caseWorkers.loanProcessors
                )
                .map((sales) => sales.name),
              paymentSchedule: prospect.paymentSchedule,
              paymentStatus: prospect.paymentStatus,
            })
      );

      let salesTotalPay = [];
      let salesRedPay = [];
      let salesRefPay = [];
      let salesInitialPay = [];
      let salesGrossPay = [];

      const periodNewSalesPayments = periodNewSales.reduce(function (res, obj) {
        let key;
        obj.sales.forEach((salesperson) => {
          key = salesperson;
          if (res[key]) {
            res[key] = res[key].concat(obj.paymentSchedule);
          } else res[key] = obj.paymentSchedule;
        });

        return res;
      }, {});

      Object.entries(periodNewSalesPayments).forEach((sales) => {
        sales[1].forEach((payment) => {
          switch (true) {
            case payment.paymentId.length > 30:
              let key = sales[0];
              let newObj = { [key]: payment.paymentAmount };

              salesTotalPay.push(newObj);

              break;
            case payment.paymentId.length === 18:
              let key1 = sales[0];
              let newObj1 = { [key1]: payment.paymentAmount };

              salesRedPay.push(newObj1);
              break;
            case payment.paymentId.length === 19:
              let key2 = sales[0];
              let newObj2 = { [key2]: payment.paymentAmount };

              salesRefPay.push(newObj2);

              break;
          }
        });
      });

      Object.entries(periodNewSalesPayments).forEach((sales) => {
        sales[1].forEach((payment) => {
          switch (true) {
            case payment.paymentIndex > 0 && payment.paymentId.length != 19:
              let key4 = sales[0];
              let newObj4 = { [key4]: payment.paymentAmount };

              return salesGrossPay.push(newObj4);

              break;
          }
        });
      });

      Object.entries(periodNewSalesPayments).forEach((sales) => {
        sales[1].forEach((payment) => {
          switch (true) {
            case payment.paymentIndex < 2 && payment.paymentId.length > 30:
              let key3 = sales[0];
              let newObj3 = { [key3]: payment.paymentAmount };

              return salesInitialPay.push(newObj3);

              break;
          }
        });
      });

      salesInitialPay = Object.entries(
        salesInitialPay.reduce((acc, i) => {
          Object.keys(i).forEach((key) =>
            acc.hasOwnProperty(key)
              ? acc[key].push(i[key])
              : (acc[key] = [i[key]])
          );
          return acc;
        }, {})
      ).map((entry) => {
        var [key, value] = entry;
        return { [key]: ["initial", value.reduce((x, y) => x + y)] };
      });

      salesGrossPay = Object.entries(
        salesGrossPay.reduce((acc, i) => {
          Object.keys(i).forEach((key) =>
            acc.hasOwnProperty(key)
              ? acc[key].push(i[key])
              : (acc[key] = [i[key]])
          );
          return acc;
        }, {})
      ).map((entry) => {
        var [key, value] = entry;
        return { [key]: ["gross", value.reduce((x, y) => x + y)] };
      });

      salesTotalPay = Object.entries(
        salesTotalPay.reduce((acc, i) => {
          Object.keys(i).forEach((key) =>
            acc.hasOwnProperty(key)
              ? acc[key].push(i[key])
              : (acc[key] = [i[key]])
          );
          return acc;
        }, {})
      ).map((entry) => {
        var [key, value] = entry;
        return { [key]: ["total", value.reduce((x, y) => x + y)] };
      });

      salesRedPay = Object.entries(
        salesRedPay.reduce((acc, i) => {
          Object.keys(i).forEach((key) =>
            acc.hasOwnProperty(key)
              ? acc[key].push(i[key])
              : (acc[key] = [i[key]])
          );
          return acc;
        }, {})
      ).map((entry) => {
        var [key, value] = entry;
        return { [key]: ["redLine", value.reduce((x, y) => x + y)] };
      });

      salesRefPay = Object.entries(
        salesRefPay.reduce((acc, i) => {
          Object.keys(i).forEach((key) =>
            acc.hasOwnProperty(key)
              ? acc[key].push(i[key])
              : (acc[key] = [i[key]])
          );
          return acc;
        }, {})
      ).map((entry) => {
        var [key, value] = entry;
        return { [key]: ["refunded", value.reduce((x, y) => x + y)] };
      });

      let salesPayments = salesTotalPay.concat(
        salesRedPay,
        salesRefPay,
        salesInitialPay,
        salesGrossPay
      );

      salesPayments = salesPayments.reduce((acc, i) => {
        Object.keys(i).forEach((key) =>
          acc.hasOwnProperty(key)
            ? acc[key].push(i[key])
            : (acc[key] = [i[key]])
        );
        return acc;
      }, {});

      let periodSalesPayments = [];
      Object.keys(salesPayments).forEach(function (key) {
        const payObj = Object.fromEntries(salesPayments[key]);
        let value = { [key]: payObj };
        periodSalesPayments.push(value);
      });

      const periodPaymentSummary = {
        periodPayments: state.periodPayments,
        periodPaymentAmount,
        periodRedlineAmount,
        periodRefundAmount,
        periodRedlineCount,
        periodRefundCount,
        periodNewPaymentAmount,
        periodPaymentMin,
        periodPaymentMax,
        periodNewPaymentMin,
        periodNewPaymentMax,
        periodRecurringPaymentAmount,
        periodClientCount,
        periodClients,
        periodAvgPayment,
        periodTrackingPayments,
        periodNewGross: totals.gross,
        periodNewInitial: totals.initial,
        periodNewTotal: totals.total,
        periodAvgGross: periodAvgs.gross,
        periodAvgInitial: periodAvgs.initial,
        periodAvgTotal: periodAvgs.total,
        periodSalesPayments,
        periodCalls: state.periodCalls,
        periodProspects: state.periodProspects,
        periodLeads: state.periodLeads,
      };

      console.log(periodPaymentSummary);
      dispatch({
        type: GET_PERIOD,
        payload: periodPaymentSummary,
      });
    });
  };

  const getRecurring = async () => {
    const res = await axios.get(`/api/prospects/today/recurring`);
    dispatch({
      type: GET_RECURRING,
      payload: res.data,
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
            .reduce((x, y) => x + y, 0)
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
          .reduce((x, y) => x + y, 0)
      );

    if (total > 0)
      lastPayment = totalPay.reduce((r, o) =>
        o.paymentDate > r.paymentDate ? o : r
      );
    if (total > 0) gross = quote - refunded;

    if (total > 0) percentPaid = total / gross;

    //  const paycheck = user.payDay.reduce((x, y) => x + y, 0);
    const periodMoney = {
      total,
      //  paycheck,
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
      .reduce((a, b) => a + b, 0);
    allPayments
      .map((prospect) => total1.push(parseInt(prospect.total)))
      .reduce((a, b) => a + b, 0);
    allPayments
      .map((prospect) => redline1.push(prospect.redLine))
      .reduce((a, b) => a + b, 0);
    allPayments
      .map((prospect) => refunded1.push(prospect.refunded))
      .reduce((a, b) => a + b, 0);
    allPayments
      .map((prospect) => quote1.push(prospect.quote))
      .reduce((a, b) => a + b, 0);

    const allTimeMoney = {
      gross: gross1.reduce((a, b) => a + b, 0),
      initial: initial1.reduce((a, b) => a + b, 0),
      total: total1.reduce((a, b) => a + b, 0),
      redline: redline1.reduce((a, b) => a + b, 0),
      refunded: refunded1.reduce((a, b) => a + b, 0),
      quote: quote1.reduce((a, b) => a + b, 0),
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
        todayCosts: state.todayCosts,
        periodCosts: state.periodCosts,
        periodPayments: state.periodPayments,
        periodLeads: state.periodLeads,
        periodProspects: state.periodProspects,
        periodCalls: state.periodCalls,
        periodPaymentSummary: state.periodPaymentSummary,
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
        getIdArray,
        getRecurring,
        setTrackingPayment,
        getTodaysCosts,
        getPeriodCosts,
        commissionPayment,
        userMoney,
        setPeriod,
        getPayments,
        getTodaysPayments,
        getTodaysProspects,
        getTodaysLeads,
        getPeriodPayments,
        getPeriodProspects,
        getPeriodLeads,
        getPeriodCalls,
        filterPayments,
        clearFilter,
        searchPaymentDates,
      }}>
      {props.children}
    </StatContext.Provider>
  );
};

export default StatState;
