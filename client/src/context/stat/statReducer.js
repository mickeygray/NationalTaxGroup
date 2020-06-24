import {
  MAKE_REPORT,
  UPDATE_REPORTS,
  DELETE_REPORT,
  GET_REPORT,
  MAKE_CSV,
  SEND_REPORT,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case MAKE_REPORT:
      return {
        ...state,
        report: action.payload,
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
