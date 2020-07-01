import {
  SET_RECENT,
  GET_LEADS,
  POST_REMINDER,
  DELETE_REMINDER,
  DELETE_RECENTLEAD,
  GET_USER,
  GET_USERNAME,
  GET_USERREMINDED,
  SET_USER,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_RECENT:
      return {
        ...state,
        recentLeads: action.payload,
      };
    case GET_LEADS:
      return {
        ...state,
        prospects: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        reminded: action.payload,
      };
    case GET_USERREMINDED:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USERNAME:
      return {
        ...state,
        name: action.payload,
      };
    case POST_REMINDER:
      return {
        ...state,
        reminder: action.payload,
      };
    case DELETE_REMINDER:
      return {
        ...state,
        reminders: state.reminders.filter(
          (reminder) => reminder._id !== action.payload
        ),
      };
    case DELETE_RECENTLEAD:
      return {
        ...state,
        recentLeads: state.recentLeads.filter(
          (recentLead) => recentLead._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
