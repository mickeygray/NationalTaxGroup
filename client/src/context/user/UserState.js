import React, { useReducer, useContext } from "react";
import { Redirect } from "react-router-dom";
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
  POST_REMINDER,
  DELETE_REMINDER,
  DELETE_RECENTLEAD,
  GET_USER,
  GET_MYPROSPECTS,
  GET_USERNAME,
  GET_USERREMINDED,
  SET_USER,
  POST_TASK,
  GET_ASSIGNED,
  DELETE_TASK,
  SET_USERPROFILE,
} from "../types";
import userContext from "./userContext";

const UserState = (props) => {
  const initialState = {
    tasks: [],
    user: {},
    users: [],
    reminders: [],
    reminder: {},
    reminded: null,
    myProspects: null,
    assignments: null,
    prospects: [],
    recentLeads: [],
    prospect: {},
    text: "",
    name: null,
  };

  const { user } = useContext(AuthContext);

  const [state, dispatch] = useReducer(userReducer, initialState);

  const getMyProspects = async (user) => {
    console.log(user);
    const res = await axios.get(`/api/prospects/caseWorkers?q=${user.name}`);

    dispatch({ type: GET_MYPROSPECTS, payload: res.data });
  };

  //get user name
  const getUserName = async (_id) => {
    const res = await axios.get(`/api/users/${_id}/name`);
    dispatch({
      type: GET_USERNAME,
      payload: res.data,
    });
  };

  const setUser = (user) => {
    console.log(user);
    dispatch({ type: SET_USERPROFILE, payload: user });
  };

  //get user name
  const getUser = async (user) => {
    console.log(user);
    const res = await axios.get(`/api/users/${user._id}`);
    dispatch({
      type: GET_USER,
      payload: res.data,
    });

    console.log(res.data);
  };

  const getUserReminded = async (query) => {
    console.log(query);

    const q = Object.values(query);
    const res = await axios.get(`/api/users?q=${q}`);
    dispatch({
      type: GET_USERREMINDED,
      payload: res.data,
    });

    console.log(res.data);
  };

  //  load my dashboard

  // populate my recent leads

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

    const recentLeads1 = prevLeads
      .filter(distinct)
      .filter((e) => typeof e !== "string");
    const recentRoutes = prevLeads
      .filter(distinct)
      .filter((e) => typeof e !== "object");

    const recentLeads = recentLeads1.filter(distinct);

    dispatch({
      type: SET_RECENT,
      payload: recentLeads,
    });
    console.log(recentLeads);
  };

  const deleteReminder = async (userReminded, reminder) => {
    console.log(reminder);
    const { id } = reminder;

    await axios.delete(`/api/users/${userReminded}/reminders?q=${id}`);

    dispatch({
      type: DELETE_REMINDER,
      payload: id,
    });

    getUser(userReminded);
  };

  const deleteTask = async (user, id) => {
    await axios.delete(`/api/users/${user._id}/tasks?q=${id}`);

    dispatch({
      type: DELETE_TASK,
      payload: id,
    });

    getUser(user._id);
  };

  const deleteRecentLead = (_id, location) => {
    dispatch({
      type: DELETE_RECENTLEAD,
      payload: _id,
    });
  };
  // Push To User Arrays (Leads, Tasks, Reminders)
  const postReminder = async (reminder) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/users/${reminder.userReminded}/reminders`,
        reminder,
        config
      );

      dispatch({
        type: POST_REMINDER,
        payload: res.data,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    getUser(reminder.userReminded);
  };

  const postTask = async (assignment, reminded) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/users/${reminded._id}/tasks`,
        assignment,
        config
      );

      dispatch({
        type: POST_TASK,
        payload: res.data,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }

    getUser(reminded._id);
  };

  const getAssigned = async (prospect, doc) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const reqObj = {
      clientId: prospect._id,
      id: doc.id,
      name: doc.name,
      endpoint: doc.endpoint,
    };

    console.log(reqObj, "11111dasdszds");

    const q = JSON.stringify(reqObj);
    const res = await axios.get(
      `/api/users/search?q=${q}`,

      config
    );

    dispatch({
      type: GET_ASSIGNED,
      payload: res.data,
    });

    console.log(res.data);
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        assignment: state.assignment,
        name: state.name,
        myProspects: state.myProspects,
        users: state.users,
        tasks: state.tasks,
        reminders: state.reminders,
        prospects: state.prospects,
        prospect: state.prospect,
        prevLeads: state.prevLeads,
        recentLeads: state.recentLeads,
        text: state.text,
        user: state.user,
        reminded: state.reminded,
        getMyProspects,
        setRecent,
        getUser,
        deleteTask,
        postTask,
        setUser,
        getUserName,
        getUserReminded,
        getAssigned,
        postReminder,
        deleteReminder,
        deleteRecentLead,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
