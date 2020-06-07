import {
  UPLOAD_FILE,
  SET_FILE,
  PARSE_LIST,
  SET_LIST,
  SET_MAILOBJECT,
  UPDATE_DB,
  DELETE_LEADS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case UPLOAD_FILE:
      return {
        ...state,
        selectedFile: action.payload,
        loaded: 0,
      };
    case DELETE_LEADS:
      return {
        ...state,
        leads: state.leads.filter((lead) => lead._id !== action.payload),
      };

    case UPDATE_DB:
      return {
        ...state,
        selectedFile: action.payload,
        loaded: 0,
      };
    case SET_FILE:
      return {
        ...state,
        selectedFile: action.payload,
      };

    case PARSE_LIST:
      return {
        ...state,
        mailList: action.payload,
      };

    case SET_LIST:
      return {
        ...state,
        list: action.payload,
      };

    case SET_MAILOBJECT:
      return {
        ...state,
        mailObject: action.payload,
      };

    default:
      return state;
  }
};
