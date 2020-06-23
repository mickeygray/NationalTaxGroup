import React, { useReducer, useContext } from "react";
import axios from "axios";
import AuthContext from "../auth/authContext";
import LeadContext from "../lead/leadContext";
import userReducer from "./userReducer";
import UserContext from "./userContext";
import { v4 as uuidv4 } from "uuid";
import { createBrowserHistory } from "history";

import {
  SET_RECENT,
  GET_LEADS,
  UPDATE_USER,
  DELETE_REMINDER,
  DELETE_RECENTLEAD,
} from "../types";

const UserState = (props) => {
  const initialState = {
    tasks: [],
    user: {},
    users: [],
    reminders: [],
    prospects: [],
    recentLeads: [],
    prospect: {},
    text: "",
  };

  const leadContext = useContext(LeadContext);
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(userReducer, initialState);

  //get user name
  const getUserName = async (_id) => {
    const user = await axios.get(`/api/users/${_id}`);

    console.log(user);
  };

  // load my dashboard

  // populate my recent leads
  const getMyLeads = async (text) => {
    const config = {
      params: {
        createdBy: `${user._id}`,
        claimedBy: `${user._id}`,
        q: `${text}`,
      },
    };
    const res = await axios.get(`/api/leads?q=${text}`, config);

    const prospects = res.data;

    dispatch({
      type: GET_LEADS,
      payload: prospects,
    });
  };

  const deleteReminder = async (user, reminder, reminders) => {
    const { _id } = user;
    const { id } = reminder;

    const config = {
      params: {
        _id: _id,
      },
      data: {
        id: id,
      },
    };

    await axios.delete(`/api/users/${_id}`, config);

    dispatch({
      type: DELETE_REMINDER,
      payload: user,
    });
  };

  // prevLeads

  const setRecent = (match) => {
    const prevLeads = user.prevLeads;
    const history = createBrowserHistory(match);
    const prevLead = history.location.pathname.slice(6);

    const setPrevious = () => {
      return prevLeads.push(prevLead);
    };

    const [...spliceLeads] = prevLeads.splice(0, 1, match, match);

    const distinct = (value, index, self) => {
      return self.indexOf(value) === index;
    };

    const recentLeads = prevLeads
      .filter(distinct)
      .filter((e) => typeof e !== "string");
    const recentRoutes = prevLeads
      .filter(distinct)
      .filter((e) => typeof e !== "object");

    console.log(recentLeads);
    dispatch({
      type: SET_RECENT,
      payload: recentLeads,
    });
    console.log(recentLeads);
  };

  const deleteRecentLead = (match, recentLeads) => {
    dispatch({ type: DELETE_RECENTLEAD, payload: recentLeads });
  };
  // Push To User Arrays (Leads, Tasks, Reminders)
  const updateUser = async (noteSpace, user, prospect) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const _id = user._id;
      const reminderId = uuidv4();
      const reminder = {
        id: reminderId,
        reminderText: JSON.stringify(noteSpace),
        clientName: prospect.fullName,
        clientId: prospect._id,
      };

      const reminders = [reminder];

      const userFields = reminders;

      const res = await axios.put(`/api/users/${_id}`, userFields, config);

      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        users: state.users,
        tasks: state.tasks,
        reminders: state.reminders,
        prospects: state.leads,
        prospect: state.prospect,
        prevLeads: state.prevLeads,
        recentLeads: state.recentLeads,
        text: state.text,
        user: state.user,
        getMyLeads,
        setRecent,
        getUserName,
        updateUser,
        deleteReminder,
        deleteRecentLead,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
