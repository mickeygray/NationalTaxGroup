import React, { useReducer, useContext } from "react";
import LeadContext from "./leadContext";
import LeadReducer from "./leadReducer";
import axios from "axios";
import {
  UPLOAD_FILE,
  SET_FILE,
  SET_LIST,
  PARSE_LIST,
  SPLIT_LEAD,
  SET_MAILOBJECT,
  UPDATE_DB,
  DELETE_LEADS,
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
  };

  const [state, dispatch] = useReducer(LeadReducer, initialState);

  const setSelectedFile = (selectedFile) => {
    console.log(selectedFile);
    dispatch({ type: SET_FILE, payload: selectedFile });
  };

  const deleteLeads = async (leads) => {
    try {
      await axios.delete(`/api/leads`, leads);

      dispatch({
        type: DELETE_LEADS,
        payload: leads,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateDb = async (selectedFile) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(`/api/leads`, selectedFile, config);

    dispatch({
      type: UPDATE_DB,
      payload: res.data,
    });
  };

  const parseDb = async (listConditions) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const query = JSON.stringify(listConditions);
    const res = await axios.get(`/api/leads?q=${query}`, config);

    const mailList = res.data;

    dispatch({
      type: PARSE_LIST,
      payload: mailList,
    });

    setList(mailList);
  };

  const setList = () => {
    dispatch({ type: SET_LIST });
  };

  const splitLead = (mailList) => {
    let bcc = [];
    let vars = [];

    mailList.forEach((lead) => {
      bcc.push(lead.email);

      delete lead.highdollar;
      delete lead.upsellable;
      delete lead.contacts;
      delete lead.converted;
      delete lead.dnc;
      delete lead._id;
      delete lead.lexId;

      vars.push(lead);
    });

    const mailObject = {
      bcc,
      vars,
    };

    console.log(mailObject);
    dispatch({
      type: SPLIT_LEAD,
      payload: mailObject,
    });

    setMailObject(mailObject);
  };

  const setMailObject = (mailObject) => {
    dispatch({ type: SET_MAILOBJECT, payload: mailObject });
  };

  const uploadFile = async (selectedFile) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(`/api/leads`, selectedFile, config);

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
        deleteLeads,
        splitLead,
        setSelectedFile,
        uploadFile,
        parseDb,
        setList,
        updateDb,
      }}>
      {props.children}
    </LeadContext.Provider>
  );
};

export default LeadState;
