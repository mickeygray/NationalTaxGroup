import {
  MAKE_REPORT,
  UPDATE_REPORTS,
  DELETE_REPORT,
  GET_REPORT,
  MAKE_CSV,
  SEND_REPORT,
  GET_FILTER,
  GET_CAMPAIGN,
  GET_IDARRAY,
  GET_CURRENTEMAIL,
  GET_LISTLENGTH,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case MAKE_REPORT:
      return {
        ...state,
        report: action.payload,
      };
    case GET_FILTER:
      return {
        ...state,
        query: action.payload,
      };
    case GET_CAMPAIGN:
      return {
        ...state,
        currentCampaign: action.payload,
      };
    case GET_CURRENTEMAIL:
      return {
        ...state,
        currentEmail: action.payload,
      };
    case GET_IDARRAY:
      return {
        ...state,
        idArray: action.payload,
      };
    case GET_LISTLENGTH:
      return {
        ...state,
        listLength: action.payload,
      };
    case UPDATE_REPORTS:
      return {
        ...state,
        reports: action.payload,
      };
    case DELETE_REPORT:
      return {
        ...state,
        call: action.payload,
      };

    case GET_REPORT:
      return {
        ...state,
        thing: action.payload,
      };
    case MAKE_CSV:
      return {
        ...state,
        csv: action.payload,
      };
    case SEND_REPORT:
      return {
        ...state,
        report: action.payload,
      };
    default:
      return state;
  }
};
