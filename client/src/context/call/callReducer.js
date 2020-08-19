import {
  GET_CALLS,
  SET_EMAILCALLS,
  SET_CAMPAIGNCALLS,
  GET_EMAILCALLS,
  GET_CAMPAIGNCALLS,
  SEND_CALL,
  FILTER_CALLS,
  CLEAR_FILTER,
  GET_LEADCALLS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_CALLS:
      return {
        ...state,
        calls: action.payload,
      };

    case GET_CAMPAIGNCALLS:
      return {
        ...state,
        campaignCalls: action.payload,
      };
    case GET_EMAILCALLS:
      return {
        ...state,
        emailCalls: action.payload,
      };

    case GET_LEADCALLS:
      return {
        ...state,
        leadCalls: action.payload,
      };
    case SEND_CALL:
      return {
        ...state,
        call: action.payload,
      };

    case FILTER_CALLS:
      return {
        ...state,
        filtered: state.calls.filter((call) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return call.customer_phone_number.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    default:
      return state;
  }
};
