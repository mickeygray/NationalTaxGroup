import React, { useReducer, useContext } from "react";
import LeadContext from "./leadContext";
import LeadReducer from "./leadReducer";
import axios from "axios";
import {
  UPLOAD_FILE,
  SET_FILE,
  SET_LIST,
  PARSE_LIST,
  UPDATE_LEAD,
  DELETE_LEADS,
  MAKE_DNC,
  UPDATE_CLIENT,
  SUBMIT_LEAD,
} from "../types";

const LeadState = (props) => {
  const initialState = {
    selectedFile: null,
    loaded: null,
    bcc: [],
    vars: [],
    mailList: [],
    list: [],
    mailObject: null,
    leads: [],
    lead: {},
    dncArray: [],
  };

  const [state, dispatch] = useReducer(LeadReducer, initialState);

  const setSelectedFile = (selectedFile) => {
    console.log(selectedFile);
    dispatch({ type: SET_FILE, payload: selectedFile });
  };

  const deleteLeads = async (leads) => {
    try {
      await axios.delete(`/api/leads/`, leads);

      dispatch({
        type: DELETE_LEADS,
        payload: leads,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateClient = async (selectedFile) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(`/api/leads/`, selectedFile, config);

    dispatch({
      type: UPDATE_CLIENT,
      payload: res.data,
    });
  };

  const submitLead = async (form) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(form);

    const res = await axios.post(`/api/leads/forms`, form, config);

    dispatch({
      type: SUBMIT_LEAD,
      payload: res.data,
    });
  };

  const updateLead = async (campaign) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(`/api/leads/`, campaign, config);

    dispatch({
      type: UPDATE_LEAD,
      payload: res.data,
    });
  };

  const makeDNC = async (lead) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(`/api/leads/${lead._id}/dnc`, lead, config);

    dispatch({
      type: MAKE_DNC,
      payload: res.data,
    });
  };

  const parseDb = async (query) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const queryString = JSON.stringify(query);
    const res = await axios.get(`/api/leads?q=${queryString}`, query, config);

    const mailList = res.data;

    console.log(mailList);
    dispatch({
      type: PARSE_LIST,
      payload: mailList,
    });
  };

  const uploadFile = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    data.forEach(function (element) {
      element.status = "new";
    });
    const res = await axios.post(`/api/leads`, data, config);

    dispatch({
      type: UPLOAD_FILE,
      payload: res.data,
    });
  };

  return (
    <LeadContext.Provider
      value={{
        selectedFile: state.selectedFile,
        loaded: state.loaded,
        vars: state.vars,
        bcc: state.bcc,
        mailObject: state.mailObject,
        mailList: state.mailList,
        dncArray: state.dncArray,
        deleteLeads,
        setSelectedFile,
        uploadFile,
        parseDb,
        submitLead,
        updateLead,
        updateClient,
        makeDNC,
      }}>
      {props.children}
    </LeadContext.Provider>
  );
};

export default LeadState;
