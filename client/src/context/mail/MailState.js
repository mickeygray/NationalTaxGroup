import React, { useReducer } from "react";
import MailContext from "./mailContext";
import JSZip, { JSZipUtils } from "jszip";
import toArray, { Stream } from "stream-to-array";
import unzipper from "unzipper";

import lodash from "lodash";

import MailReducer from "./mailReducer";
import axios from "axios";
import {
  CREATE_DIRECTMAIL,
  UPDATE_DIRECTMAIL,
  GET_DIRECTMAIL,
  SET_DIRECTMAILITEM,
  VIEW_MAILITEM,
  SEND_MAIL,
  DELETE_DIRECTMAIL,
  CREATE_DIRECTMAILSCHEDULE,
  GET_DIRECTMAILSCHEDULE,
  SET_DIRECTMAILSCHEDULE,
  SET_DMAILLIBRARY,
  GET_INVOICES,
  SET_MAILCOSTS,
  SET_LETTER,
  SET_INVOICES,
  SUBMIT_COSTS,
  LIST_INVOICES,
  GET_DAILYCOSTS,
} from "../types";
import { fromPairs } from "lodash";

const MailState = (props) => {
  const initialState = {
    mailItem: {},
    mailLibrary: [],
    letter: null,
    invoices: null,
    mailEntry: [],
    scheduleObj: {},
    mailCosts: [],
    mailSchedule: [],
  };

  const [state, dispatch] = useReducer(MailReducer, initialState);

  //Create Direct Mail Item

  const fetchInvoices = async () => {
    const res = await axios.get("/api/mail/invoices");

    dispatch({
      type: GET_INVOICES,
      payload: res.data,
    });
  };

  const getInvoiceList = async (ranges) => {
    const config = {
      responseType: "arraybuffer",
    };
    const qstring = JSON.stringify(ranges[0]);

    const res = await axios.get(`/api/mail/invoices/new?q=${qstring}`, config);

    console.log(res.data);
    let invoices = [];
    JSZip.loadAsync(res.data).then(function (zip) {
      Object.keys(zip.files).forEach(function (filename) {
        console.log(zip.files);
        zip.files[filename].async("blob").then(async function (fileData) {
          fileData = fileData.slice(0, fileData.size, "application/pdf");
          invoices.push(fileData);

          console.log(fileData);
        });
      });
    });

    dispatch({
      type: LIST_INVOICES,
      payload: invoices,
    });
  };

  const createDirectMailItem = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post(`/api/mail`, formData, config);

    dispatch({
      type: CREATE_DIRECTMAIL,
      payload: res.data,
    });
  };

  const createDirectMailSchedule = async (entry, unit) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const reqObj = { entry, unit };
    const res = await axios.post(`/api/mail/schedule`, reqObj, config);

    dispatch({
      type: CREATE_DIRECTMAILSCHEDULE,
      payload: res.data,
    });
  };

  const setDirectMailLibrary = (mailLibrary) => {
    dispatch({
      type: SET_DMAILLIBRARY,
      payload: mailLibrary,
    });
  };
  //Update Direct Mail Item

  const updateDirectMailItem = async (_id, formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.put(`/api/mail/${_id}`, formData, config);

    dispatch({
      type: UPDATE_DIRECTMAIL,
      payload: res.data,
    });
  };

  // Delete Direct Mail Item

  const deleteDirectMailItem = async (_id) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post(`/api/mail/`, config);

    dispatch({
      type: DELETE_DIRECTMAIL,
      payload: res.data,
    });
  };

  const getDailyCosts = async (ranges) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const qstring = JSON.stringify(ranges[0]);
    const res = await axios.get(`/api/leads/costs?q=${qstring}`, config);

    dispatch({
      type: GET_DAILYCOSTS,
      payload: res.data,
    });

    setCosts(res.data);
  };

  const sendMail = async () => {
    const res = await axios.post("/api/mail/delivery");

    dispatch({
      type: SEND_MAIL,
      payload: res.data,
    });
  };

  //Get Direct Mail Library

  const setCosts = (costs) => {
    var outObject = costs.reduce(function (a, e) {
      // GROUP BY estimated key (estKey), well, may be a just plain key
      // a -- Accumulator result object
      // e -- sequentally checked Element, the Element that is tested just at this itaration

      // new grouping name may be calculated, but must be based on real value of real field
      let estKey = e["mailer"];

      (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
      return a;
    }, {});

    lodash.sumBy(costs, function (o) {
      return o.unitCost;
    });

    Object.entries(outObject).map((arr) => {
      const dateRange = [...new Set(arr[1].map((item) => item.date))]; // [ 'A', 'B']
      console.log(dateRange);
      const mailerCost = {
        mailer: [arr[0]].toString(),
        totalCost: lodash.sumBy(arr[1], "unitCost").toFixed(2),

        dateRange: dateRange,
      };

      state.mailCosts.push(mailerCost);
    });
    dispatch({
      type: SET_MAILCOSTS,
      payload: state.mailCosts,
    });
  };

  const submitCosts = async (total, mailer) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const reqObj = {
      total,
      mailer,
    };
    const res = await axios.put(`/api/mail/costs`, reqObj, config);
    dispatch({
      type: SUBMIT_COSTS,
      payload: res.data,
    });
  };

  const setInvoices = (invoices) => {
    dispatch({
      type: SET_INVOICES,
      payload: invoices,
    });
  };

  const getDirectMailLibrary = async () => {
    const res = await axios.get(`/api/mail`);

    dispatch({
      type: GET_DIRECTMAIL,
      payload: res.data,
    });

    setDirectMailLibrary(res.data);
  };
  //Get Direct Mail Calendar
  const getDirectMailSchedule = async () => {
    const res = await axios.get(`/api/mail/schedule`);

    console.log(res.data);
    dispatch({
      type: GET_DIRECTMAILSCHEDULE,
      payload: res.data,
    });

    setDirectMailSchedule(res.data);
  };

  //
  //Set Current Direct Mail Item
  const setDirectMailItem = (mailItem) => {
    dispatch({
      type: SET_DIRECTMAILITEM,
      payload: mailItem,
    });
  };

  const setDirectMailSchedule = (mailSchedule) => {
    var scheduleObj = mailSchedule.reduce(function (r, o) {
      var k = o.scheduleDate;
      if (r[k] || (r[k] = [])) r[k].push(o);
      return r;
    }, {});

    dispatch({
      type: SET_DIRECTMAILSCHEDULE,
      payload: scheduleObj,
    });
  };

  const setLetter = (letter) => {
    console.log(letter);
    dispatch({
      type: SET_LETTER,
      payload: letter,
    });
  };
  //View Current Direct Mail Item

  const viewMailItem = async (mailItem) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob",
    };

    console.log(mailItem);
    const res = await axios.get(`/api/mail/mailItem?q=${mailItem}`, config);
    dispatch({
      type: VIEW_MAILITEM,
      payload: res.data,
    });

    setLetter(res.data);
  };

  //Create New Entry

  //Add Direct Mail Item to Current Entry

  //Update current calendar entry

  //Delete Calendar entry

  //Get Aged List - mail to mail house

  //Add Mail Entry values to each list

  //Upload invoice - update mail entry values

  return (
    <MailContext.Provider
      value={{
        createDirectMailItem,
        getDirectMailLibrary,
        setDirectMailItem,
        sendMail,
        viewMailItem,
        getDailyCosts,
        setDirectMailLibrary,
        setCosts,
        setInvoices,
        submitCosts,
        fetchInvoices,
        getInvoiceList,
        setLetter,
        setDirectMailSchedule,
        createDirectMailSchedule,
        getDirectMailSchedule,
        mailLibrary: state.mailLibrary,
        mailCosts: state.mailCosts,
        invoices: state.invoices,
        scheduleObj: state.scheduleObj,
        mailItem: state.mailItem,
        mailEntry: state.mailEntry,
        letter: state.letter,
        mailSchedule: state.mailSchedule,
      }}>
      {props.children}
    </MailContext.Provider>
  );
};

export default MailState;
