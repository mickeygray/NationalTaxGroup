import {
  UPLOAD_FILE,
  SET_FILE,
  PARSE_LIST,
  SET_LIST,
  SET_MAILOBJECT,
  UPDATE_CLIENT,
  UPDATE_LEAD,
  DELETE_LEADS,
  MAKE_DNC,
  SPLIT_LEAD,
  SET_DNCOBJECT,
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

    case UPDATE_CLIENT:
      return {
        ...state,
        selectedFile: action.payload,
        loaded: 0,
      };

    case UPDATE_LEAD:
      return {
        ...state,
        campaign: action.payload,
      };
    case SET_FILE:
      return {
        ...state,
        selectedFile: action.payload,
      };
    case MAKE_DNC:
      return {
        ...state,
        dncArray: action.payload,
      };

    case SPLIT_LEAD:
      return {
        ...state,
        mailObject: action.payload,
      };

    case PARSE_LIST:
      return {
        ...state,
        mailList: action.payload,
      };

    case SET_LIST:
      return {
        ...state,
        mailList: action.payload,
      };

    default:
      return state;
  }
};
