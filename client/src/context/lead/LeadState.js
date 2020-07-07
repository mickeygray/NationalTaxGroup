import React, { useReducer, useContext } from "react";
import LeadContext from "./leadContext";

import AuthContext from "../auth/authContext";
import LeadReducer from "./leadReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

import {
  UPLOAD_FILE,
  SET_FILE,
  PARSE_LIST,
  UPDATE_LEAD,
  DELETE_LEADS,
  MAKE_DNC,
  UPDATE_CLIENT,
  ADD_LEXIS,
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
  GET_NOTES,
  PUT_NOTE,
  SET_NOTE,
  SET_NOTES,
  POST_NOTE,
  DELETE_NOTE,
  SET_PROSPECT,
  GET_NAME,
  PUSH_WORKER,
  PUT_RESO,
  PUT_PAYMENTSCHEDULE,
  PUT_PAYMENTINFO,
  PUT_PAYMENTSCHEDULEITEM,
  SET_CURRENTMETHOD,
  DELETE_PAYMENTMETHOD,
  DELETE_PAYMENTSCHEDULEITEM,
  DELETE_WORKER,
} from "../types";

const LeadState = (props) => {
  const initialState = {
    selectedFile: null,
    caseWorkers: [],
    loaded: null,
    currentNote: null,
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
    note: {},
    current: null,
    currentMethod: null,
    call: {},
    calls: [],
    note: {},
    notes: [],
    text: "",
    number: null,
    recentLeads: [],
    todaysLeads: [],
    fullName: null,
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

  const addLexis = async (file, current) => {
    const res = await axios.put(`/api/leads/${current.lienid}/pdfs`, file);

    dispatch({
      type: ADD_LEXIS,
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
    } = prospect;

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

  const getProspectName = async (clientId) => {
    console.log(clientId);

    const res = await axios.get(`/api/prospects/${clientId}/fullName`);

    const { fullName } = res.data;
    dispatch({
      type: GET_NAME,
      payload: fullName,
    });
  };

  const { user } = useContext(AuthContext);

  const setNotes = (notes) => {
    console.log(notes);
    dispatch({ type: SET_NOTES, payload: notes });
  };

  const putNote = async (note, user, prospect) => {
    const noteObj = {
      note: note,
      user: user,
    };

    const { notes } = prospect;
    const res = await axios.put(
      `/api/prospects/${prospect._id}/notes/`,
      noteObj
    );
    setNotes(notes);
    setNotes(null);

    dispatch({
      type: PUT_NOTE,
      payload: res.data,
    });
    getProspect(prospect._id);
  };

  const getNotes = async (prospect) => {
    const res = await axios.get(`/api/prospects/${prospect._id}/notes`);

    dispatch({
      type: GET_NOTES,
      payload: res.data,
    });
  };

  const postNote = async (note, prospect) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { _id, notes } = prospect;

    const res = await axios.post(`/api/prospects/${_id}/notes`, note, config);
    setNotes(notes);
    setNotes(null);
    dispatch({
      type: POST_NOTE,
      payload: res.data,
    });
    getProspect(prospect._id);
  };

  const setCurrentNote = (currentNote) => {
    console.log(currentNote);
    dispatch({
      type: SET_NOTE,
      payload: currentNote,
    });
  };

  const deleteNote = async (note, prospect) => {
    const { _id, notes } = prospect;
    const { id } = note;

    await axios.delete(`/api/prospects/${_id}/notes?q=${id}`);

    dispatch({
      type: DELETE_NOTE,
      payload: id,
    });
    getProspect(prospect._id);
  };

  const deletePaymentMethod = async (paymentMethod, prospect) => {
    const { paymentMethods } = prospect;
    const { _id } = paymentMethod;

    await axios.delete(
      `/api/prospects/${prospect._id}/paymentMethods?q=${_id}`
    );

    dispatch({
      type: DELETE_PAYMENTMETHOD,
      payload: _id,
    });
    getProspect(prospect._id);
  };

  const deletePaymentScheduleItem = async (payment, prospect) => {
    const { paymentMethods } = prospect;
    const { _id } = payment;

    await axios.delete(
      `/api/prospects/${prospect._id}/paymentSchedule?q=${_id}`
    );

    dispatch({
      type: DELETE_PAYMENTSCHEDULEITEM,
      payload: _id,
    });
    getProspect(prospect._id);
  };

  const deleteWorker = async (caseWorker, prospect) => {
    const { _id } = caseWorker;

    await axios.delete(`/api/prospects/${prospect._id}/caseWorkers?q=${_id}`);

    dispatch({
      type: DELETE_WORKER,
      payload: _id,
    });

    getProspect(prospect._id);
  };
  //Search Liens

  const setRecentLead = (recentLead) => {
    dispatch({ type: SET_RECENTLEAD, payload: recentLead });
  };

  const setCurrentMethod = (paymentMethod) => {
    dispatch({ type: SET_CURRENTMETHOD, payload: paymentMethod });
  };

  // Set Lien in Ship Em Form

  const setCurrent = (current) => {
    dispatch({ type: SET_CURRENT, payload: current });
  };

  // Set Call in Ship Em Form
  const letCall = (number) => {
    dispatch({ type: LET_CALL, payload: number });
  };

  // get id and set name id value pair for recent array

  const getProspect = async (_id) => {
    const res = await axios.get(`/api/prospects/${_id}`);

    const prospect = res.data;
    const notes = { prospect };
    setNotes(notes);
    setNotes(null);
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
        `/api/prospects/clientId/}`,
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

  const setProspect = (prospect) => {
    console.log(prospect);
    dispatch({ type: SET_PROSPECT, payload: prospect });
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

  const pushWorker = async (user, prospect, group) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { caseWorkers } = group;

    const location = Object.values(caseWorkers)
      .toString()
      .replace(",", "")
      .replace(",", "")
      .replace(",", "")
      .replace(",", "")
      .replace(",", "")
      .replace(",", "")
      .replace(",", "")
      .replace(",", "")
      .replace(",", "")
      .replace(",", "")
      .replace(",", "")
      .replace(",", "")
      .replace(",", "")
      .replace(",", "")
      .replace(",", "")
      .replace(",", "")
      .replace(",", "")
      .replace(",", "");

    console.log(location);

    const res = await axios.put(
      `/api/prospects/${prospect._id}/caseWorkers/${location}`,
      user,
      config
    );

    dispatch({
      type: PUSH_WORKER,
      payload: res.data,
    });
    getProspect(prospect._id);
  };

  const parseDb = async (query) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const qCheck = Object.values(query).toString().length;

    const q = Object.values(query).toString();

    console.log(q);
    const res = await axios.get(
      `/api/${qCheck > 5 ? "prospects" : "leads"}/status?q=${q}`,
      q,
      config
    );

    const mailList = res.data;

    console.log(mailList);
    dispatch({
      type: PARSE_LIST,
      payload: mailList,
    });
  };

  const putResoStatus = async (reso, prospect) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(
      `/api/prospects/${prospect._id}/resoStatus`,
      reso,
      config
    );

    dispatch({
      type: PUT_RESO,
      payload: res.data,
    });

    getProspect(prospect._id);
  };

  const putPaymentMethod = async (method, prospect) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(
      `/api/prospects/${prospect._id}/paymentMethods`,
      method,
      config
    );

    dispatch({
      type: PUT_PAYMENTINFO,
      payload: res.data,
    });
    getProspect(prospect._id);
    console.log(res.data);
  };

  const putPaymentScheduleItem = async (newPayment, prospect) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        _id: prospect._id,
      },
    };

    const prospectid = prospect._id;

    const pockage = {
      newPayment,
      prospectid,
    };

    const res = await axios.put(
      `/api/prospects/${prospect._id}/paymentSchedule/${newPayment._id}`,
      pockage,
      config
    );
    dispatch({
      type: PUT_PAYMENTSCHEDULEITEM,
      payload: res.data,
    });

    getProspect(prospect._id);
  };

  const putPaymentSchedule = async (iteration, scheduleItem, prospect) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let sched = [];

    const scheduleItem1 = {
      paymentMethod: scheduleItem.initialPaymentMethod,
      paymentAmount: scheduleItem.initialPaymentAmount,
      paymentDate: Date.parse(scheduleItem.initialPaymentDate),
      paymentId: "",
    };

    const scheduleItem2 = {
      paymentMethod: scheduleItem.secondPaymentMethod,
      paymentAmount: scheduleItem.secondPaymentAmount,
      paymentDate: Date.parse(scheduleItem.secondPaymentDate),
      paymentId: "",
    };

    sched.push(scheduleItem1);
    sched.push(scheduleItem2);
    const startDate = Date.parse(scheduleItem.thirdPaymentDate);
    let it = parseInt(iteration.installments);
    let int;
    let arr;
    if (iteration.interval === "single") {
      int = 0 * 86400000;
    } else if (iteration.interval === "weekly") {
      int = 7 * 86400000; // int is in millisseconds
    } else if (iteration.interval === "biweekly") {
      int = 14 * 86400000; // int is in millisseconds
    } else if (iteration.interval === "monthly") {
      int = 30.42 * 86400000; // int is in millisseconds
    }
    arr = [];

    for (let i = 0; i < it; i++)
      arr[i] = {
        paymentDate: new Date(startDate + i * int),
        paymentMethod: iteration.initialPaymentMethod,
        paymentAmount: iteration.installmentAmount,
        paymentId: "",
      };

    console.log(arr);

    const paymentSchedule = sched.concat(arr);

    const res = await axios.put(
      `/api/prospects/${prospect._id}/paymentSchedule`,
      paymentSchedule,
      config
    );

    dispatch({
      type: PUT_PAYMENTSCHEDULE,
      payload: res.data,
    });
    getProspect(prospect._id);
    console.log(res.data);
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
        fullName: state.fullName,
        lien: state.lien,
        lead: state.lead,
        call: state.call,
        calls: state.calls,
        note: state.note,
        notes: state.notes,
        currentNote: state.currentNote,
        text: state.text,
        prospect: state.prospect,
        prospects: state.prospects,
        clients: state.clients,
        client: state.client,
        current: state.current,
        currentMethod: state.currentMethod,
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
        caseWorkers: state.caseWorkers,
        addLexis,
        setCurrentMethod,
        putPaymentMethod,
        deletePaymentMethod,
        deletePaymentScheduleItem,
        putPaymentScheduleItem,
        pushWorker,
        getProspectName,
        setProspect,
        deleteLeads,
        deleteWorker,
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
        putResoStatus,
        clearLead,
        clearLeadFields,
        clearRecentLead,
        clearNumber,
        putNote,
        postNote,
        getNotes,
        setNotes,
        setCurrentNote,
        deleteNote,
        setRecentLead,
        setCurrent,
        letCall,
        clearLiens,
        updateProspect,
        getProspects,
        getMyLeads,
        getProspect,
        postLogics,
        putPaymentSchedule,
      }}>
      {props.children}
    </LeadContext.Provider>
  );
};

export default LeadState;
