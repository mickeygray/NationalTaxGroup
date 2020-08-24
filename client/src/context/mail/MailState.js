import React, { useReducer } from "react";
import MailContext from "./mailContext";
import MailReducer from "./mailReducer";
import axios from "axios";
import {
  CREATE_DIRECTMAIL,
  UPDATE_DIRECTMAIL,
  GET_DIRECTMAIL,
  SET_DIRECTMAILITEM,
  VIEW_MAILITEM,
  CREATE_ENTRY,
  DELETE_DIRECTMAIL,
  CREATE_DIRECTMAILSCHEDULE,
  SET_DMAILLIBRARY,
  SET_LETTER,
} from "../types";

const MailState = (props) => {
  const initialState = {
    mailItem: {},
    mailLibrary: [],
    letter: null,
    mailEntry: [],
    mailSchedule: [],
  };

  const [state, dispatch] = useReducer(MailReducer, initialState);

  //Create Direct Mail Item

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

  //Get Direct Mail Library

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
      type: GET_DIRECTMAIL,
      payload: res.data,
    });
  };

  //
  //Set Current Direct Mail Item
  const setDirectMailItem = (mailItem) => {
    dispatch({
      type: SET_DIRECTMAILITEM,
      payload: mailItem,
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

  const createDirectMailEntry = (mailItem) => {
    //creates a slot in calendar relative to others
    dispatch({
      type: CREATE_ENTRY,
      payload: state.mailEntry,
    });
  };

  //Add Direct Mail Item to Current Entry
  const pushMailItem = (mailItem) => {
    dispatch({});
  };

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
        viewMailItem,
        setDirectMailLibrary,
        setLetter,
        createDirectMailSchedule,
        getDirectMailSchedule,
        mailLibrary: state.mailLibrary,
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
