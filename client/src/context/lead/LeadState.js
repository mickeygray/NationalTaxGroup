import React, { useReducer, useContext } from "react";
import LeadContext from "./leadContext";


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
  ADD_LEXISPROSPECT,
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
  SET_CURRENTCLIENT,
  CLEAR_CURRENTMETHOD,
  CLEAR_CURRENTCLIENT,
  DELETE_PAYMENTMETHOD,
  DELETE_PAYMENTSCHEDULEITEM,
  DELETE_WORKER,
  GET_PAYMENTMETHOD,
  UPDATE_PAYMENTSTATUS,
  UPDATE_CLIENTSTATUS,
  GET_TODAYSPROSPECTS,
  GET_FILE,
  POP_DOC,
  SET_DOC,
  SET_DOCS,
  DELETE_DUPS,
  SET_WORKERS,
  SEND_EMAIL,
  SET_FILTERS,
  DELETE_DOC,
} from "../types";

const LeadState = (props) => {
  const initialState = {
    selectedFile: null,
    caseWorkers: [],
    loaded: null,
    currentNote: null,
    bcc: [],
    docs: [],
    vars: [],
    doc: null,
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
    currentClient: null,
    callIn: null,
    calls: [],
    note: {},
    notes: [],
    filters: [],
    filters1: [],
    worker: null,
    prospectsRes: [],
    workers: [],
    workers1: [],
    text: "",
    recentLeads: [],
    todaysLeads: [],
    fullName: null,
    paymentMethod: null,
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

    setCurrent(res.data);
  };

  const addLexisProspect = async (file, prospect) => {
    const res = await axios.put(`/api/prospects/${prospect._id}/pdfs`, file);

    dispatch({
      type: ADD_LEXISPROSPECT,
      payload: res.data,
    });

    getProspect(prospect._id);
  };

  const sendEmail = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post(`/api/prospects/email`, formData, config);
    dispatch({
      type: SEND_EMAIL,
      payload: res.data,
    });
  };

  const addLead = async (prospect) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(prospect, "1111111111");

    const res = await axios.post("/api/prospects/", prospect, config);

    dispatch({
      type: POST_LEAD,
      payload: res.data,
    });
  };

  const setFilters = (array) => {
    state.filters = state.filters.concat(array);
    function filterByCount(array, count) {
      return array.filter(function (value) {
        return (
          array.filter(function (v) {
            return v === value;
          }).length === count
        );
      });
    }
    state.filters = filterByCount(state.filters, 1);

    dispatch({ type: SET_FILTERS, payload: state.filters });
  };

  // Clear Liens
  const clearLead = () => {
    dispatch({ type: CLEAR_LEAD });
  };

  const clearLeadFields = () => {
    dispatch({ type: CLEAR_LEADFIELDS });
  };

  const clearCurrentMethod = () => {
    dispatch({
      type: CLEAR_CURRENTMETHOD,
    });
  };

  const clearCurrentClient = () => {
    dispatch({
      type: CLEAR_CURRENTCLIENT,
    });
  };

  const clearRecentLead = () => {
    dispatch({ type: CLEAR_RECENTLEAD });
  };

  const clearNumber = () => {
    dispatch({ type: CLEAR_NUMBER });
  };

  const getTodaysProspects = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get(`/api/prospects/today`);

    dispatch({
      type: GET_TODAYSPROSPECTS,
      payload: res.data,
    });
  };
  const popDoc = async (prospect) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(prospect);

    const res = await axios.post(`/api/prospects/form`, prospect, config);
    dispatch({
      type: POP_DOC,
      payload: res.data,
    });

    setDoc(res.data);
  };

  const getProspectName = async (clientId) => {
    console.log(clientId);

    const res = await axios.get(`/api/prospects/${clientId}/fullName`);

    let fullName = "";

    if (res.data != null) {
      fullName = res.data.fullName;
    }

    dispatch({
      type: GET_NAME,
      payload: fullName,
    });
  };

  const getPaymentMethod = async (payment) => {
    console.log(payment);
    const res = await axios.get(
      `/api/prospects/paymentMethods?q=${payment._id}`
    );

    dispatch({
      type: GET_PAYMENTMETHOD,
      payload: res.data,
    });

    console.log(res.data);

    const { paymentData, clientId } = res.data;

    const paymentMethod = paymentData;
    setCurrentMethod(paymentMethod);
    setCurrentClient(clientId);
  };

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
    updatePaymentStatus(prospect);
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

  const setCurrentClient = (clientId) => {
    dispatch({ type: SET_CURRENTCLIENT, payload: clientId });
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
  const getProspects = async (text, filters) => {
    const res = await axios.get(`/api/prospects?q=${text}`);

    const prospects = res.data;

    const prospectsRes =
      state.filters.length === 0
        ? prospects
        : prospects.filter((prospect) => {
            let searchResults = [];
            return state.filters.some((filter) => {
              if (filter.includes(" ")) {
                for (const array of prospect.caseWorkers.originators) {
                  if (array.name === filter) return array;
                }
                for (const array1 of prospect.caseWorkers.loanProcessors) {
                  if (array1.name === filter) return array1;
                }
                for (const array2 of prospect.caseWorkers.documentProcessors) {
                  if (array2.name === filter) return array2;
                }
                for (const array3 of prospect.caseWorkers.upsells) {
                  if (array3.name === filter) return array3;
                }
                for (const array4 of prospect.caseWorkers.federalReso) {
                  if (array4.name === filter) return array4;
                }
                for (const array5 of prospect.caseWorkers.stateReso) {
                  if (array5.name === filter) return array5;
                }
                for (const array6 of prospect.caseWorkers.taxPreparers) {
                  if (array6.name === filter) return array6;
                }
              } else {
                let searchResults = [];
                switch (filter) {
                  case "hasRepresentation":
                    for (const array of prospect.resoStatus.representation) {
                      if (array.id) return searchResults.concat(array);
                    }
                    break;

                  case "hasFederalFile":
                    for (const array of prospect.resoStatus.representation) {
                      if (array.id) return searchResults.concat(array);
                    }
                    break;
                  case "hasHardship":
                    for (const array of prospect.resoStatus.representation) {
                      if (array.id) return searchResults.concat(array);
                    }
                    break;
                  case "hasStateFile":
                    for (const array of prospect.resoStatus.representation) {
                      if (array.id) return searchResults.concat(array);
                    }
                    break;
                  case "hasPaymentPlan":
                    for (const array of prospect.resoStatus.representation) {
                      if (array.id) return searchResults.concat(array);
                    }
                    break;
                  case "hasOffer":
                    for (const array of prospect.resoStatus.representation) {
                      if (array.id) return searchResults.concat(array);
                    }
                    break;
                  case "hasAppeal":
                    for (const array of prospect.resoStatus.representation) {
                      if (array.id) return searchResults.concat(array);
                    }
                    break;
                  case "hasCorp":
                    for (const array of prospect.resoStatus.representation) {
                      if (array.id) return searchResults.concat(array);
                    }
                    break;
                  case "hasAnnuity":
                    for (const array of prospect.resoStatus.representation) {
                      if (array.id) return searchResults.concat(array);
                    }
                    break;

                  case "hasAnnuity":
                    for (const array of prospect.resoStatus.representation) {
                      if (array.id) return searchResults.concat(array);
                    }
                    break;
                }
              }
            });
          });

    dispatch({
      type: GET_LEADS,
      payload: prospectsRes,
    });
  };

  const deleteDups = async (match) => {
    const lienid = match.lienid;
    const res = await axios.delete(`/api/prospects/lienid?q=${lienid}`);

    dispatch({
      type: DELETE_DUPS,
      payload: res.data,
    });
  };

  const getMyLeads = async (text, user) => {
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

  const updateProspect = async (leadFields, prospect) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/prospects/${prospect._id}`,
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

  const deleteDoc = async (prospect, doc) => {
    console.log(prospect);

    try {
      const name = doc.name.slice(
        doc.name.indexOf("/") + 1,
        doc.name.lastIndexOf("/")
      );

      console.log(doc.name);
      const res = await axios.delete(
        `/api/prospects/${prospect._id}/resoStatus/${name}/${doc._id}`
      );

      dispatch({
        type: DELETE_DOC,
        payload: res.data,
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

  const postResoStatus = async (prospect, formData, endpoint, config) => {
    console.log(formData);
    const res = await axios.put(
      `/api/prospects/${prospect._id}/resoStatus/${endpoint}`,
      formData,
      config
    );

    dispatch({
      type: PUT_RESO,
      payload: res.data,
    });
    setDocs(prospect);
    getProspect(prospect._id);
  };

  const putResoStatus = async (prospect, formData, endpoint, config, doc) => {
    function search(nameKey, myArray) {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].name.includes(nameKey)) {
          return myArray[i];
        }
      }
    }

    const searchedArray = eval("prospect.resoStatus." + endpoint);

    const assignment = search(doc.name, searchedArray);

    const res = await axios.put(
      `/api/prospects/${prospect._id}/resoStatus/${endpoint}/${assignment._id}`,
      formData,
      config
    );

    dispatch({
      type: PUT_RESO,
      payload: res.data,
    });
    setDocs(prospect);
    getProspect(prospect._id);
  };

  const getResoStatus = async (prospect, doc) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob",
    };

    const string = doc.id;

    console.log(string);

    const res = await axios.get(
      `/api/prospects/${prospect._id}/resoStatus?q=${string}`,
      config
    );

    dispatch({
      type: GET_FILE,
      payload: res.data,
    });

    setDoc(res.data);
  };

  const setDoc = (document) => {
    dispatch({ type: SET_DOC, payload: document });
  };

  const setDocs = (prospect) => {
    const { resoStatus } = prospect;

    const {
      representation,
      federalFile,
      stateFile,
      paymentPlan,
      appeal,
      annuity,
      corp,
      offer,
      hardship,
    } = resoStatus;

    const docs = representation.concat(
      federalFile,
      stateFile,
      paymentPlan,
      appeal,
      annuity,
      corp,
      offer,
      hardship
    );

    dispatch({ type: SET_DOCS, payload: docs });
  };

  const putPaymentMethod = async (state, prospect) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(
      `/api/prospects/${prospect._id}/paymentMethods`,
      state,
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

    updatePaymentStatus(prospect);
  };

  const putPaymentSchedule = async (iteration, scheduleItem, prospect) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let sched = [];

    let dateDisplay1 = new Date(scheduleItem.initialPaymentDate);
    let formattedPostedDate = Intl.DateTimeFormat(
      "en-US",
      { timeZone: "America/Los_Angeles" },
      {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }
    ).format(dateDisplay1);
    console.log(scheduleItem.initialPaymentDate, "THISSSS NIGGGGGER");

    let dateDisplay2 = new Date(scheduleItem.secondPaymentDate);
    let formattedPostedDate2 = Intl.DateTimeFormat(
      "en-US",
      { timeZone: "America/Los_Angeles" },
      {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }
    ).format(dateDisplay2);

    const scheduleItem1 = {
      paymentIndex: 1,
      paymentMethod: scheduleItem.initialPaymentMethod,
      paymentAmount: scheduleItem.initialPaymentAmount,
      paymentDate: scheduleItem.initialPaymentDate,
      paymentId: "",
    };

    const scheduleItem2 = {
      paymentIndex: 2,
      paymentMethod: scheduleItem.secondPaymentMethod,
      paymentAmount: scheduleItem.secondPaymentAmount,
      paymentDate: scheduleItem.secondPaymentDate,
      paymentId: "",
    };

    sched.push(scheduleItem1);

    if (parseInt(scheduleItem2.paymentAmount) > 0) {
      sched.push(scheduleItem2);
    }

    console.log(sched);
    let startDate;
    let it = parseInt(iteration.installments);
    let int;
    let arr;
    if (iteration.interval != "") {
      startDate = Date.parse(scheduleItem.secondPaymentDate);
    }

    if (iteration.interval === "weekly") {
      int = 7 * 86400000; // int is in millisseconds
    } else if (iteration.interval === "biweekly") {
      int = 14 * 86400000; // int is in millisseconds
    } else if (iteration.interval === "monthly") {
      int = 30.42 * 86400000; // int is in millisseconds
    }
    arr = [];

    for (let i = 0; i < it; i++)
      arr[i] = {
        paymentIndex: 3 + i,
        paymentDate: new Date(startDate + i * int),
        paymentMethod: iteration.initialPaymentMethod,
        paymentAmount: iteration.installmentAmount,
        paymentId: "",
      };

    arr.pop();

    const paySched = sched.concat(arr);

    console.log(paySched);

    const res = await axios.put(
      `/api/prospects/${prospect._id}/paymentSchedule`,
      paySched,
      config
    );

    dispatch({
      type: PUT_PAYMENTSCHEDULE,
      payload: res.data,
    });
    getProspect(prospect._id);
    console.log(res.data);

    updatePaymentStatus(prospect);
  };

  const updatePaymentStatus = async (prospect) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get(
      `/api/prospects/${prospect._id}/paymentSchedule`,
      config
    );
    dispatch({
      type: UPDATE_PAYMENTSTATUS,
      payload: res.data,
    });
  };

  const updateProspectStatus = async (prospect, status) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const statReq = {
      val: status,
    };

    const res = await axios.put(
      `/api/prospects/${prospect._id}/status`,
      statReq,
      config
    );
    dispatch({
      type: UPDATE_CLIENTSTATUS,
      payload: res.data,
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
        dncArray: state.dncArray,
        liens: state.liens,
        fullName: state.fullName,
        lien: state.lien,
        lead: state.lead,
        callIn: state.callIn,
        calls: state.calls,
        worker: state.worker,
        workers: state.workers,
        filters1: state.filters1,
        filters: state.filters,
        workers1: state.workers1,
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
        prospectsRes: state.prospectsRes,
        mailObject: state.mailObject,
        doc: state.doc,
        docs: state.docs,
        mailList: state.mailList,
        dncArray: state.dncArray,
        caseWorkers: state.caseWorkers,
        currentClient: state.currentClient,
        setCurrentClient,
        addLexis,
        setCurrentMethod,
        putPaymentMethod,
        updatePaymentStatus,
        deletePaymentMethod,
        deletePaymentScheduleItem,
        getPaymentMethod,
        putPaymentScheduleItem,
        setFilters,
        pushWorker,
        getTodaysProspects,
        getProspectName,
        setProspect,
        deleteLeads,
        deleteWorker,
        addLead,
        updateProspectStatus,
        setSelectedFile,
        uploadFile,
        parseDb,
        getLead,
        setCalls,
        submitLead,
        popDoc,
        updateLead,
        getResoStatus,
        sendEmail,
        makeDNC,
        searchLeads,
        putResoStatus,
        clearLead,
        clearLeadFields,
        setDocs,
        addLexisProspect,
        clearRecentLead,
        clearNumber,
        putNote,
        postNote,
        getNotes,
        setNotes,
        setCurrentNote,
        deleteNote,
        setDoc,
        setRecentLead,
        postResoStatus,
        setCurrent,
        deleteDoc,
        letCall,
        clearLiens,
        updateProspect,
        getProspects,
        getMyLeads,
        getProspect,
        deleteDups,
        postLogics,
        putPaymentSchedule,
        clearCurrentMethod,
        clearCurrentClient,
      }}>
      {props.children}
    </LeadContext.Provider>
  );
};

export default LeadState;
