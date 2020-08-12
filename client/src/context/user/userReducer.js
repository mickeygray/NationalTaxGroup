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
  SET_USERPROFILE,
  GET_MYPROSPECTS,
  GET_PERIODPAY,
  POST_TASK,
  DELETE_TASK,
  GET_ASSIGNED,
  SET_PERIODPAY,
  SET_SPLITS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_RECENT:
      return {
        ...state,
        recentLeads: action.payload,
      };
    case SET_SPLITS:
      return {
        ...state,
        split: action.payload,
      };
    case GET_MYPROSPECTS:
      return {
        ...state,
        myProspects: action.payload,
      };
    case GET_PERIODPAY:
      return {
        ...state,
        payments: action.payload,
      };
    case SET_PERIODPAY:
      return {
        ...state,
        periodPay: action.payload,
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

    case SET_USERPROFILE:
      return {
        ...state,
        user: action.payload,
      };
    case GET_ASSIGNED:
      return {
        ...state,
        assignments: action.payload,
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
    case POST_TASK:
      return {
        ...state,
        task: action.payload,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case DELETE_REMINDER:
      return {
        ...state,
        reminders: state.reminders.filter(
          (reminder) => reminder.id !== action.payload
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
