import {
  CREATE_DIRECTMAIL,
  GET_DIRECTMAIL,
  VIEW_MAILITEM,
  SET_LETTER,
  SET_DIRECTMAILITEM,
  CREATE_DIRECTMAILSCHEDULE,
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
    case GET_DIRECTMAIL:
      return {
        ...state,
        mailLibrary: action.payload,
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
