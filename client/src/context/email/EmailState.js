import React, { useReducer } from "react";
import EmailContext from "./emailContext";
import EmailReducer from "./emailReducer";
import axios from "axios";
import {
  SET_EMAIL,
  POST_EMAIL,
  POST_CAMPAIGN,
  GET_LIBRARY,
  SEND_EMAIL,
  GET_CAMPAIGNS,
  PUT_EMAIL,
  PUT_LIST,
  SET_CAMPAIGN,
  DELETE_CAMPAIGN,
  DELETE_TEMPLATE,
} from "../types";

const EmailState = (props) => {
  const initialState = {
    emailLibrary: [],
    email: null,
    campaign: {},
    campaigns: [],
    mailObject: {},
  };

  const [state, dispatch] = useReducer(EmailReducer, initialState);

  const setTemplate = (email) => {
    dispatch({ type: SET_EMAIL, payload: email });
  };

  const setCampaign = (campaign) => {
    console.log(campaign);
    dispatch({ type: SET_CAMPAIGN, payload: campaign });
  };

  const saveCampaign = async (campaign) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/emails/campaigns`, campaign, config);
    dispatch({ type: POST_CAMPAIGN, payload: res.data });
  };

  const saveEmail = async (letter) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/emails/templates`, letter, config);
    dispatch({ type: POST_EMAIL, payload: res.data });
  };

  const deleteCampaign = async (_id) => {
    try {
      await axios.delete(`/api/emails/campaigns/${_id}`);

      dispatch({
        type: DELETE_CAMPAIGN,
        payload: _id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTemplate = async (_id) => {
    try {
      await axios.delete(`/api/emails/templates/${_id}`);

      dispatch({
        type: DELETE_TEMPLATE,
        payload: _id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const searchEmails = async (text) => {
    const res = await axios.get(`/api/emails/templates?q=${text}`);

    dispatch({ type: GET_LIBRARY, payload: res.data });
  };

  const putEmail = async (email, campaign) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/emails/campaigns/${campaign._id}`,
        email,
        campaign,
        config
      );
      dispatch({
        type: PUT_EMAIL,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const editTemplate = async (letter) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(letter);

    try {
      const res = await axios.put(`/api/emails/templates/`, letter, config);
      dispatch({
        type: PUT_EMAIL,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const putList = async (mailList, campaign) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/emails/campaigns/${campaign._id}/list`,
        mailList,
        campaign,
        config
      );

      dispatch({
        type: PUT_LIST,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const searchCampaigns = async (text) => {
    const res = await axios.get(`/api/emails/campaigns?q=${text}`);

    dispatch({ type: GET_CAMPAIGNS, payload: res.data });
  };

  const sendEmail = async (campaign) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(campaign);
    const res = await axios.post(`/api/emails`, campaign, config);
    dispatch({ type: SEND_EMAIL, payload: res.data });
  };

  return (
    <EmailContext.Provider
      value={{
        setTemplate,
        sendEmail,
        saveEmail,
        searchEmails,
        saveCampaign,
        searchCampaigns,
        putEmail,
        putList,
        editTemplate,
        setCampaign,
        deleteCampaign,
        deleteTemplate,
        campaigns: state.campaigns,
        campaign: state.campaign,
        emailLibrary: state.emailLibrary,
        email: state.email,
      }}>
      {props.children}
    </EmailContext.Provider>
  );
};

export default EmailState;
