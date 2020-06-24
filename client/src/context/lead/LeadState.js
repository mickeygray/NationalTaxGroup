import React, { useReducer, useContext } from "react";
import LeadContext from "./leadContext";

import AuthContext from "../auth/authContext";
import LeadReducer from "./leadReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { v4 as uuidv4 } from "uuid";
import {
  UPLOAD_FILE,
  SET_FILE,
  PARSE_LIST,
  UPDATE_LEAD,
  DELETE_LEADS,
  MAKE_DNC,
  UPDATE_CLIENT,
  SUBMIT_LEAD,
  GET_LIEN,
  SEARCH_LIENS,
  SET_CALLS,
  GET_LEAD,
  GET_LEADS,
  SET_CURRENT,
  LET_CALL,
  CLEAR_LIENS,
  POST_LEAD,
  CLEAR_LEAD,
  CLEAR_NUMBER,
  POST_LOGICS,
  UPDATE_PROSPECT,
  CLEAR_LEADFIELDS,
  CLEAR_RECENTLEAD,
  SET_RECENTLEAD,
  SET_NOTES,
  SET_NOTE,
  DELETE_NOTE,
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
    lead: null,
    dncArray: [],
    liens: [],
    leads: [],
    prospects: [],
    prospect: {},
    client: {},
    clients: [],
    lien: {},
    lead: {},
    current: null,
    call: {},
    calls: [],
    note: {},
    notes: [],
    text: "",
    number: null,
    claimedBy: "unclaimed",
    recentLeads: [],
    todaysLeads: [],
  };

  const [state, dispatch] = useReducer(LeadReducer, initialState);

  let logicsId;
  let logicsPw;

  if (process.env.NODE_ENV !== "production") {
    logicsId = process.env.REACT_APP_LOGICS_ID;
    logicsPw = process.env.REACT_APP_LOGICS_PW;
  } else {
    logicsId = process.env.REACT_APP_LOGICS_ID;
    logicsPw = process.env.REACT_APP_LOGICS_PW;
  }

  const setCalls = async (phone) => {
    const res = await axios.get(`/api/prospects/calls?q=${phone}`);

    console.log(res.data);

    dispatch({
      type: SET_CALLS,
      payload: res.data,
    });
  };

  const addLead = async (prospect) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(prospect);
    const {
      phone,
      fullName,
      deliveryAddress,
      city,
      st,
      zip4,
      plaintiff,
      amount,
      lienid,
      email,
      pinCode,
      compliant,
      filingStatus,
      cpa,
      ssn,
      noteText,
    } = prospect;

    const noteId = uuidv4();

    const notes = [{ id: noteId, noteText: noteText, notePostedBy: "" }];

    const steve = {
      phone,
      fullName,
      deliveryAddress,
      city,
      st,
      zip4,
      plaintiff,
      amount,
      lienid,
      email,
      pinCode,
      compliant,
      filingStatus,
      cpa,
      ssn,
      notes,
    };

    const res = await axios.post("/api/prospects/", steve, config);

    dispatch({
      type: POST_LEAD,
      payload: res.data,
    });
  };

  // Clear Liens
  const clearLead = () => {
    dispatch({ type: CLEAR_LEAD });
  };

  const clearLeadFields = () => {
    dispatch({ type: CLEAR_LEADFIELDS });
  };

  const clearRecentLead = () => {
    dispatch({ type: CLEAR_RECENTLEAD });
  };

  const clearNumber = () => {
    dispatch({ type: CLEAR_NUMBER });
  };

  const { user } = useContext(AuthContext);

  const setClaim = async (user, prospect) => {
    const _id = prospect._id;
    const claimedBy = user.name;
    const isClaimed = true;
    const leadFields = { claimedBy, isClaimed };

    updateLead(leadFields, _id);
  };

  const putNote = async (noteSpace1, user, prospect) => {
    console.log(user);
    const _id = prospect._id;
    const noteId = uuidv4();

    const note = {
      id: noteId,
      noteText: JSON.stringify(noteSpace1),
      notePostedBy: user.name,
    };

    const leadFields = { note };

    updateLead(leadFields, _id);
  };

  const setApproved = async (prospect) => {
    const _id = prospect._id;
    const isApproved = true;
    const leadFields = { isApproved };

    updateLead(leadFields, _id);
  };

  const setUnclaim = async (user, prospect) => {
    const _id = prospect._id;
    const claimedBy = "unclaimed";
    const isClaimed = false;
    const leadFields = { claimedBy, isClaimed };

    updateLead(leadFields, _id);
  };

  //Search Liens

  const setRecentLead = (recentLead) => {
    dispatch({ type: SET_RECENTLEAD, payload: recentLead });
  };

  // Set Lien in Ship Em Form

  const setCurrent = (current) => {
    dispatch({ type: SET_CURRENT, payload: current });
  };

  const setNotes = (notes) => {
    dispatch({ type: SET_NOTES, payload: notes });
  };

  const setNote = (note) => {
    dispatch({ type: SET_NOTE, payload: note });
  };
  // Set Call in Ship Em Form
  const letCall = (number) => {
    dispatch({ type: LET_CALL, payload: number });
  };

  const deleteNote = async (note, prospect) => {
    const { _id } = prospect;
    const { id } = note;

    const config = {
      params: {
        _id: _id,
      },
      data: {
        id: id,
      },
    };
    console.log(_id);
    console.log(id);

    const res = await axios.delete(`/api/prospects/${_id}`, config);

    dispatch({
      type: DELETE_NOTE,
      payload: res.data,
    });
  };

  // get id and set name id value pair for recent array

  const getProspect = async (_id) => {
    const res = await axios.get(`/api/prospects/${_id}`);

    const prospect = res.data;

    dispatch({
      type: GET_LEAD,
      payload: prospect,
    });
  };

  // Lead Seach in stacks
  const getProspects = async (text) => {
    const res = await axios.get(`/api/prospects?q=${text}`);

    console.log(text);
    const prospects = res.data;

    dispatch({
      type: GET_LEADS,
      payload: prospects,
    });
  };

  const getMyLeads = async (text) => {
    const config = {
      params: {
        createdBy: `${user._id}`,
        claimedBy: `${user._id}`,
        q: `${text}`,
      },
    };
    const res = await axios.get("/api/prospects", config);

    const prospects = res.data;

    dispatch({
      type: GET_LEADS,
      payload: prospects,
    });
  };

  /*
    const searchLeadDates = async text => { 
      
      const config = {
        params: {
         createdBy:`${user._id}`,
         claimedBy:`${user._id}`,
         q:`${text}`
        }
      };
      const res = await axios.get('/api/leads', config);
    
      const leads = res.data 
  
      dispatch({
        type: GET_LEADS,
        payload: leads
      });  
      
      console.log(res.data)
      console.log(leads)
      
    }  
  
    const searchLeadStatus = async text => { 
      
      const config = {
        params: {
         isClaimed:`${}`,
         isClosed:`${user._id}`,
         isPaid:`${text}`
        }
      };
      const res = await axios.get('/api/leads', config);
    
      const leads = res.data 
  
      dispatch({
        type: GET_LEADS,
        payload: leads
      });  
      
      console.log(res.data)
      console.log(leads)
      
    }
  */

  // Update Lead
  const updateClient = async (leadFields, _id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/prospects/clients/${_id}`,
        leadFields,
        config
      );

      dispatch({
        type: UPDATE_PROSPECT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateProspect = async (leadFields, _id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`/api/prospects/${_id}`, leadFields, config);

      dispatch({
        type: UPDATE_PROSPECT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //post to logics
  const postLogics = async (current) => {
    const config = {
      headers: {
        "Authorization": `Basic ${logicsId}|${logicsPw}`,
      },
    };

    const {
      name,
      address,
      city,
      state,
      zip,
      plaintiff,
      amount,
      email,
      lexId,
      compliant,
      filingStatus,
      cpa,
      ssn,
      phone,
      note,
    } = current;

    setAuthToken(null);

    const res = await axios.post(
      `https://nattax.irslogics.com/postLead.aspx?FNAME=${name}&&ADDRESS=${address}&&CITY=${city}&&ZIP=${zip}&&TAX_RELIEF_TAX_AMOUNT=${amount}&&CELL_PHONE=${phone}&&EMAIL=${email}&&NOTES=${plaintiff}`,
      config
    );

    dispatch({
      type: POST_LOGICS,
      payload: res.data,
    });
  };

  // Clear Liens
  const clearLiens = () => {
    dispatch({ type: CLEAR_LIENS });
  };

  const searchLeads = async (text) => {
    const res = await axios.get(`/api/leads/search?q=${text}`);

    dispatch({
      type: SEARCH_LIENS,
      payload: res.data,
    });
  };

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

    console.log(query);

    const queryString = JSON.stringify(query);
    const res = await axios.get(
      `/api/leads/query?q=${queryString}`,
      query,
      config
    );

    const mailList = res.data;

    console.log(mailList);
    dispatch({
      type: PARSE_LIST,
      payload: mailList,
    });
  };

  const getLead = async (lead) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get(
      `/api/leads/:id/pinCode?q=${lead.pinCode},${lead.email}`,
      lead,
      config
    );

    dispatch({
      type: GET_LIEN,
      payload: res.data,
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
      element.amount = parseFloat(element.amount).toFixed(2);
      element.nineAmount = parseFloat(element.amount * 0.95).toFixed(2);
      element.fiveAmount = parseFloat(element.amount * 0.05).toFixed(2);
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
        dncArray: [],
        liens: state.liens,
        lien: state.lien,
        lead: state.lead,
        call: state.call,
        calls: state.calls,
        note: state.note,
        notes: state.notes,
        text: state.text,
        prospect: state.prospect,
        prospects: state.prospects,
        clients: state.clients,
        client: state.client,
        current: state.current,
        number: state.number,
        claimedBy: state.claimedBy,
        recentLeads: state.recentLeads,
        todaysLeads: state.todaysLeads,
        selectedFile: state.selectedFile,
        loaded: state.loaded,
        vars: state.vars,
        bcc: state.bcc,
        leads: state.leads,
        mailObject: state.mailObject,
        mailList: state.mailList,
        dncArray: state.dncArray,
        deleteLeads,
        addLead,
        setSelectedFile,
        uploadFile,
        parseDb,
        getLead,
        setCalls,
        submitLead,
        updateLead,
        updateClient,
        makeDNC,
        searchLeads,
        clearLead,
        clearLeadFields,
        clearRecentLead,
        clearNumber,
        setClaim,
        putNote,
        setUnclaim,
        setRecentLead,
        setCurrent,
        setApproved,
        letCall,
        clearLiens,
        setNote,
        setNotes,
        updateProspect,
        getProspects,
        getMyLeads,
        getProspect,
        postLogics,
      }}>
      {props.children}
    </LeadContext.Provider>
  );
};

export default LeadState;
