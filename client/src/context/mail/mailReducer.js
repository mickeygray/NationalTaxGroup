import {
  CREATE_DIRECTMAIL,
  GET_DIRECTMAIL,
  VIEW_MAILITEM,
  SET_LETTER,
  SET_DIRECTMAILITEM,
  SUBMIT_COSTS,
  CREATE_DIRECTMAILSCHEDULE,
  GET_DIRECTMAILSCHEDULE,
  SET_MAILCOSTS,
  SEND_MAIL,
  SET_DIRECTMAILSCHEDULE,
  GET_DAILYCOSTS,
  GET_INVOICES,
  SET_INVOICES,
  LIST_INVOICES,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case CREATE_DIRECTMAIL:
      return {
        ...state,
        mailItem: action.payload,
      };
    case CREATE_DIRECTMAILSCHEDULE:
      return {
        ...state,
        mailSchedule: action.payload,
      };
    case SEND_MAIL:
      return {
        ...state,
        mailSchedule: action.payload,
      };

    case SUBMIT_COSTS:
      return {
        ...state,
        costs: action.payload,
      };
    case GET_DIRECTMAIL:
      return {
        ...state,
        mailLibrary: action.payload,
      };
    case GET_INVOICES:
      return {
        ...state,
        invoices: action.payload,
      };
    case SET_INVOICES:
      return {
        ...state,
        invoices: action.payload,
      };

    case SET_MAILCOSTS:
      return {
        ...state,
        mailCosts: action.payload,
      };
    case LIST_INVOICES:
      return {
        ...state,
        invoices: action.payload,
      };
    case GET_DIRECTMAILSCHEDULE:
      return {
        ...state,
        mailSchedule: action.payload,
      };
    case GET_DAILYCOSTS:
      return {
        ...state,
        dailyCosts: action.payload,
      };
    case SET_DIRECTMAILSCHEDULE:
      return {
        ...state,
        scheduleObj: action.payload,
      };
    case SET_DIRECTMAILITEM:
      return {
        ...state,
        mailItem: action.payload,
      };
    case VIEW_MAILITEM:
      return {
        ...state,
        letter: action.payload,
      };
    case SET_LETTER:
      return {
        ...state,
        letter: action.payload,
      };
    default:
      return state;
  }
};
